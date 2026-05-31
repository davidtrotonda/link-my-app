const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Stripe = require("stripe");

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");
const stripeWebhookLegacySecret = defineSecret("STRIPE_WEBHOOK_SECRET_LEGACY");
const configuredInvokers =
  process.env.FUNCTIONS_INVOKER?.split(",").map((entry) => entry.trim()).filter(Boolean) ||
  [];
const functionInvoker = configuredInvokers.length > 0 ? configuredInvokers : "public";
const appOrigin = process.env.APP_ORIGIN || "https://link-my.app";

const allowedOrigins = [
  appOrigin,
  process.env.APP_ORIGIN_WWW,
  process.env.FIREBASE_HOSTING_ORIGIN,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
].filter(Boolean);

admin.initializeApp({
  databaseURL:
    process.env.FIREBASE_DATABASE_URL ||
    "https://your-project-default-rtdb.europe-west1.firebasedatabase.app",
});

function getStripe() {
  return new Stripe(stripeSecretKey.value());
}

function constructStripeWebhookEvent(stripe, rawBody, signature) {
  const acceptedSecrets = [
    stripeWebhookSecret.value(),
    stripeWebhookLegacySecret.value(),
  ].filter(Boolean);
  let lastError;

  for (const secret of acceptedSecrets) {
    try {
      return stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function isAllowedOrigin(origin = "") {
  return allowedOrigins.some((entry) =>
    typeof entry === "string" ? entry === origin : entry.test(origin)
  );
}

async function getUserFromRequest(req) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer (.+)$/);

  if (!match) {
    throw new Error("missing-token");
  }

  return admin.auth().verifyIdToken(match[1]);
}

exports.createCheckoutSession = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
    secrets: [stripeSecretKey],
  },
  async (req, res) => {
    res.set("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const decodedToken = await getUserFromRequest(req);

      const origin = isAllowedOrigin(req.body?.origin)
        ? req.body.origin
        : appOrigin;
      const stripe = getStripe();

      const currency = req.body?.currency === "usd" ? "usd" : "eur";
      const productName = currency === "usd" ? "Link My App Lifetime Pro" : "Link My App Pro de por vida";
      const productDesc = currency === "usd" 
        ? "Unlimited SmartLinks, QR codes, and complete analytics."
        : "SmartLinks ilimitados, QR ilimitados y estadísticas completas.";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        client_reference_id: decodedToken.uid,
        customer_email: decodedToken.email || undefined,
        customer_creation: "always",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: currency,
              unit_amount: 999,
              product_data: {
                name: productName,
                description: productDesc,
              },
            },
          },
        ],
        metadata: {
          uid: decodedToken.uid,
          plan: "pro_lifetime",
        },
        invoice_creation: {
          enabled: true,
          invoice_data: {
            metadata: {
              uid: decodedToken.uid,
              plan: "pro_lifetime",
            },
          },
        },
        payment_intent_data: {
          metadata: {
            uid: decodedToken.uid,
            plan: "pro_lifetime",
          },
        },
        success_url: `${origin}${req.body.pathname || "/dashboard"}?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}${req.body.pathname || "/dashboard"}?stripe=cancel`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      logger.error("createCheckoutSession failed", error);
      const message =
        error.message === "missing-token"
          ? "Inicia sesión para usar esta función."
          : "Error interno en el servidor.";
      res.status(400).json({ error: message });
    }
  }
);

exports.createPortalSession = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
    secrets: [stripeSecretKey],
  },
  async (req, res) => {
    res.set("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const decodedToken = await getUserFromRequest(req);
      const origin = isAllowedOrigin(req.body?.origin)
        ? req.body.origin
        : appOrigin;
      const snapshot = await admin.database().ref(`users/${decodedToken.uid}`).get();
      const stripeCustomerId = snapshot.val()?.stripeCustomerId;

      if (!stripeCustomerId) {
        res.status(400).json({
          error: "Todavía no hay datos de facturación para esta cuenta.",
        });
        return;
      }

      const stripe = getStripe();
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${origin}${req.body.pathname || "/dashboard"}`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      logger.error("createPortalSession failed", error);
      const message =
        error.message === "missing-token"
          ? "Inicia sesión para ver tus facturas."
          : "No se ha podido abrir el portal de facturación.";
      res.status(400).json({ error: message });
    }
  }
);

exports.stripeWebhook = onRequest(
  {
    region: "europe-west1",
    invoker: functionInvoker,
    secrets: [stripeSecretKey, stripeWebhookSecret, stripeWebhookLegacySecret],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method not allowed");
      return;
    }

    const signature = req.get("stripe-signature");
    const stripe = getStripe();
    let event;

    try {
      event = constructStripeWebhookEvent(stripe, req.rawBody, signature);
    } catch (error) {
      logger.warn("Stripe webhook signature failed", error);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const uid = session.metadata?.uid || session.client_reference_id;

      if (uid && session.payment_status === "paid") {
        await admin.database().ref(`users/${uid}`).update({
          plan: "pro",
          planLabel: "Pro de por vida",
          proSince: admin.database.ServerValue.TIMESTAMP,
          stripeCustomerId:
            typeof session.customer === "string" ? session.customer : "",
          stripeLastSessionId: session.id,
          updatedAt: admin.database.ServerValue.TIMESTAMP,
        });
      }
    }

    res.json({ received: true });
  }
);

exports.applyPromoCode = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const decodedToken = await getUserFromRequest(req);
      const { promoCode } = req.body || {};

      if (!promoCode || typeof promoCode !== "string") {
        res.status(400).json({ error: "Código promocional requerido." });
        return;
      }

      const promoCodeStr = promoCode.trim().toUpperCase();
      const codeSnap = await admin.database().ref(`settings/promoCodes/${promoCodeStr}`).once("value");

      if (codeSnap.exists() && codeSnap.val().active === true) {
        await admin.database().ref(`users/${decodedToken.uid}`).update({
          plan: "pro",
          planLabel: "Pro (Promoción)",
          proSince: admin.database.ServerValue.TIMESTAMP,
          updatedAt: admin.database.ServerValue.TIMESTAMP,
        });

        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "Código promocional no válido o expirado." });
      }
    } catch (error) {
      logger.error("applyPromoCode failed", error);
      const message =
        error.message === "missing-token"
          ? "Inicia sesión para aplicar un código promocional."
          : "Error interno al aplicar el código promocional.";
      res.status(400).json({ error: message });
    }
  }
);

exports.verifyPayment = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
    secrets: [stripeSecretKey],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const decodedToken = await getUserFromRequest(req);
      const stripe = getStripe();
      const sessionId = req.body?.session_id;

      if (!sessionId) {
        res.status(400).json({ error: "Falta session_id." });
        return;
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const uid = session.metadata?.uid || session.client_reference_id;
        
        if (uid === decodedToken.uid) {
          await admin.database().ref(`users/${uid}`).update({
            plan: "pro",
            planLabel: "Pro de por vida",
            proSince: admin.database.ServerValue.TIMESTAMP,
            stripeCustomerId: typeof session.customer === "string" ? session.customer : "",
            stripeLastSessionId: session.id,
            updatedAt: admin.database.ServerValue.TIMESTAMP,
          });
          
          res.status(200).json({ success: true, plan: "pro" });
          return;
        }
      }
      
      res.status(200).json({ success: true, plan: "free" });
    } catch (error) {
      logger.error("verifyPayment failed", error);
      res.status(400).json({ error: "Error al verificar el pago." });
    }
  }
);
