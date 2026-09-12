const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Stripe = require("stripe");

const firebaseDeployTargets = new Set(
  (process.env.FIREBASE_DEPLOY_TARGETS || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
);
const stripeFunctionNames = new Set([
  "createCheckoutSession",
  "createPortalSession",
  "stripeWebhook",
  "verifyPayment",
]);
const includesStripeDeployment =
  firebaseDeployTargets.size === 0 ||
  [...firebaseDeployTargets].some((target) => stripeFunctionNames.has(target));
const deploymentSecret = (name) =>
  includesStripeDeployment
    ? defineSecret(name)
    : { value: () => process.env[name] || "" };
const stripeSecretBindings = (...secrets) =>
  includesStripeDeployment ? secrets : [];

const stripeSecretKey = deploymentSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = deploymentSecret("STRIPE_WEBHOOK_SECRET");
const stripeWebhookLegacySecret = deploymentSecret("STRIPE_WEBHOOK_SECRET_LEGACY");
const configuredInvokers =
  process.env.FUNCTIONS_INVOKER?.split(",").map((entry) => entry.trim()).filter(Boolean) ||
  [];
const functionInvoker = configuredInvokers.length > 0 ? configuredInvokers : "public";
const appOrigin = process.env.APP_ORIGIN || "https://link-my.app";
const adminEmails = Array.from(
  new Set(
    (process.env.ADMIN_EMAILS || "info@skeilapps.com,davidtroton@gmail.com")
      .split(/[,\s]+/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  )
);

const allowedOrigins = [
  appOrigin,
  process.env.APP_ORIGIN_WWW,
  process.env.FIREBASE_HOSTING_ORIGIN,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
].filter(Boolean);

admin.initializeApp();

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

function normalizeEmail(value = "") {
  return String(value).trim().toLowerCase();
}

function emailKeyFromEmail(email) {
  return Buffer.from(normalizeEmail(email)).toString("base64url");
}

function isAdminToken(decodedToken) {
  return adminEmails.includes(normalizeEmail(decodedToken.email || ""));
}

async function getAdminFromRequest(req) {
  const decodedToken = await getUserFromRequest(req);

  if (!isAdminToken(decodedToken)) {
    const error = new Error("forbidden");
    error.status = 403;
    throw error;
  }

  return decodedToken;
}

function cleanString(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeUrl(value = "") {
  const trimmed = cleanString(value);
  if (!trimmed) return "";

  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function publicProfileData(profile = {}) {
  return {
    uid: String(profile.uid || ""),
    displayName: cleanString(profile.displayName, "Usuario").slice(0, 120),
    bio: cleanString(profile.bio).slice(0, 500),
    photoURL: cleanString(profile.photoURL).slice(0, 2048),
    public: profile.public !== false,
    updatedAt: profile.updatedAt || admin.database.ServerValue.TIMESTAMP,
  };
}

function publicLinkData(link = {}) {
  return {
    ownerId: String(link.ownerId || ""),
    title: cleanString(link.title).slice(0, 160),
    slug: cleanString(link.slug),
    iosUrl: normalizeUrl(link.iosUrl),
    androidUrl: normalizeUrl(link.androidUrl),
    fallbackUrl: normalizeUrl(link.fallbackUrl),
    active: link.active === true,
    createdAt: link.createdAt || admin.database.ServerValue.TIMESTAMP,
    updatedAt: link.updatedAt || admin.database.ServerValue.TIMESTAMP,
    ...(link.channel ? { channel: cleanString(link.channel).slice(0, 40) } : {}),
    ...(link.parentLinkId ? { parentLinkId: cleanString(link.parentLinkId).slice(0, 160) } : {}),
  };
}

async function writePrivateAndPublicLink(linkRef, link) {
  const linkId = linkRef.key;
  if (!linkId) throw new Error("No se pudo crear el identificador del link.");

  await admin.database().ref().update({
    [`links/${linkId}`]: link,
    [`publicLinks/${linkId}`]: link.active === true ? publicLinkData(link) : null,
  });
}

function slugFromInput(value = "") {
  return cleanString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function buildPreparedLinks(rawLinks) {
  if (!Array.isArray(rawLinks)) return [];

  return rawLinks
    .map((item, index) => {
      const title = cleanString(item?.title);
      const iosUrl = normalizeUrl(item?.iosUrl);
      const androidUrl = normalizeUrl(item?.androidUrl);
      const fallbackUrl = normalizeUrl(item?.fallbackUrl);
      const customUrl = slugFromInput(item?.customUrl || title);
      const hasAnyValue = [
        title,
        cleanString(item?.iosUrl),
        cleanString(item?.androidUrl),
        cleanString(item?.fallbackUrl),
        cleanString(item?.customUrl),
      ].some(Boolean);

      if (!hasAnyValue) return null;
      if (!title || !iosUrl || !androidUrl || !fallbackUrl) {
        const error = new Error("Completa nombre, App Store, Google Play y web alternativa para crear el link inicial.");
        error.status = 400;
        throw error;
      }

      return {
        id: slugFromInput(customUrl || title) || `prepared-${index}`,
        title,
        iosUrl,
        androidUrl,
        fallbackUrl,
        customUrl,
      };
    })
    .filter(Boolean);
}

async function makeUniqueSlug(baseValue) {
  const baseSlug = slugFromInput(baseValue) || `app-${Date.now().toString(36)}`;
  let candidate = baseSlug;

  for (let index = 0; index < 50; index += 1) {
    const snapshot = await admin.database().ref("links").orderByChild("slug").equalTo(candidate).once("value");
    const taken = Object.values(snapshot.val() || {}).some((link) => link.active === true);
    if (!taken) return candidate;
    candidate = `${baseSlug}-${index + 2}`;
  }

  const error = new Error("No se pudo generar una URL corta libre.");
  error.status = 409;
  throw error;
}

async function createPreparedLinksForUser({ uid, email, preparedKey, links, createdByEmail }) {
  const createdLinks = [];

  for (const item of links || []) {
    const preparedLinkId = item.id || slugFromInput(item.title);
    const adminPreparedKey = `${preparedKey}_${preparedLinkId}`;
    const existingSnapshot = await admin
      .database()
      .ref("links")
      .orderByChild("adminPreparedKey")
      .equalTo(adminPreparedKey)
      .once("value");
    const existingEntry = Object.entries(existingSnapshot.val() || {})[0];

    if (existingEntry) {
      createdLinks.push({
        id: existingEntry[0],
        title: existingEntry[1].title,
        slug: existingEntry[1].slug,
        existing: true,
      });
      continue;
    }

    const slug = await makeUniqueSlug(item.customUrl || item.title);
    const linkRef = admin.database().ref("links").push();
    await writePrivateAndPublicLink(linkRef, {
      ownerId: uid,
      ownerEmail: email,
      title: item.title,
      slug,
      customUrl: "",
      iosUrl: item.iosUrl,
      androidUrl: item.androidUrl,
      fallbackUrl: item.fallbackUrl,
      active: true,
      adminPreparedKey,
      createdByAdminEmail: createdByEmail || "",
      createdAt: admin.database.ServerValue.TIMESTAMP,
      updatedAt: admin.database.ServerValue.TIMESTAMP,
    });

    createdLinks.push({ id: linkRef.key, title: item.title, slug });
  }

  return createdLinks;
}

async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  const usersSnapshot = await admin.database().ref("users").once("value");
  const users = usersSnapshot.val() || {};
  const profileEntry = Object.entries(users).find(([, value]) => {
    return normalizeEmail(value?.emailNormalized || value?.email || "") === normalizedEmail;
  });

  if (profileEntry) {
    return { uid: profileEntry[0], profile: profileEntry[1] };
  }

  try {
    const authUser = await admin.auth().getUserByEmail(normalizedEmail);
    return {
      uid: authUser.uid,
      profile: {
        uid: authUser.uid,
        email: authUser.email || normalizedEmail,
        displayName: authUser.displayName || "",
        photoURL: authUser.photoURL || "",
      },
    };
  } catch (error) {
    if (error?.code === "auth/user-not-found") return null;
    throw error;
  }
}

async function applyPreparedAccountToUser(preparedKey, preparedAccount, targetUser) {
  const uid = targetUser.uid;
  const existingSnapshot = await admin.database().ref(`users/${uid}`).once("value");
  const existingProfile = existingSnapshot.val() || targetUser.profile || {};
  const email = normalizeEmail(preparedAccount.email || existingProfile.email);
  const displayName =
    cleanString(preparedAccount.displayName) ||
    cleanString(existingProfile.displayName) ||
    email.split("@")[0] ||
    "Usuario";
  const bio =
    typeof preparedAccount.bio === "string"
      ? preparedAccount.bio.trim()
      : existingProfile.bio || "Mis smart links de Link My App.";

  const privateProfile = {
    uid,
    displayName,
    email,
    emailNormalized: email,
    photoURL: existingProfile.photoURL || "",
    bio,
    public: preparedAccount.public !== false,
    createdAt: existingProfile.createdAt || admin.database.ServerValue.TIMESTAMP,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
  };
  await admin.database().ref().update({
    [`users/${uid}`]: { ...existingProfile, ...privateProfile },
    [`publicProfiles/${uid}`]: publicProfileData({ ...existingProfile, ...privateProfile }),
  });

  const createdLinks = await createPreparedLinksForUser({
    uid,
    email,
    preparedKey,
    links: preparedAccount.links || [],
    createdByEmail: preparedAccount.createdByEmail,
  });

  await admin.database().ref(`preparedAccounts/${preparedKey}`).update({
    status: "applied",
    consumedBy: uid,
    consumedAt: admin.database.ServerValue.TIMESTAMP,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
    createdLinks,
  });

  return { uid, createdLinks };
}

exports.prepareUserAccount = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
  },
  async (req, res) => {
    res.set("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const adminUser = await getAdminFromRequest(req);
      const email = normalizeEmail(req.body?.email || "");
      if (!email || !email.includes("@")) {
        res.status(400).json({ error: "Email válido requerido." });
        return;
      }

      const preparedKey = emailKeyFromEmail(email);
      const existingPrepared = await admin.database().ref(`preparedAccounts/${preparedKey}`).once("value");
      const preparedLinks = buildPreparedLinks(req.body?.links);
      const preparedAccount = {
        ...(existingPrepared.val() || {}),
        email,
        emailNormalized: email,
        displayName: cleanString(req.body?.displayName) || email.split("@")[0],
        bio: cleanString(req.body?.bio, "Mis smart links de Link My App."),
        public: req.body?.public !== false,
        links: preparedLinks,
        status: "pending",
        createdByUid: adminUser.uid,
        createdByEmail: adminUser.email || "",
        createdAt: existingPrepared.val()?.createdAt || admin.database.ServerValue.TIMESTAMP,
        updatedAt: admin.database.ServerValue.TIMESTAMP,
      };

      await admin.database().ref(`preparedAccounts/${preparedKey}`).set(preparedAccount);

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        const result = await applyPreparedAccountToUser(preparedKey, preparedAccount, existingUser);
        res.status(200).json({
          success: true,
          userExisted: true,
          uid: result.uid,
          createdLinks: result.createdLinks,
        });
        return;
      }

      res.status(200).json({
        success: true,
        userExisted: false,
        preparedKey,
      });
    } catch (error) {
      logger.error("prepareUserAccount failed", error);
      const status = error.status || (error.message === "missing-token" ? 401 : 400);
      const message =
        error.message === "missing-token"
          ? "Inicia sesión como admin."
          : error.message === "forbidden"
            ? "No tienes permisos de administración."
            : error.message || "No se pudo preparar la cuenta.";
      res.status(status).json({ error: message });
    }
  }
);

exports.consumePreparedAccount = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
  },
  async (req, res) => {
    res.set("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const decodedToken = await getUserFromRequest(req);
      const email = normalizeEmail(decodedToken.email || "");
      if (!email) {
        res.status(200).json({ success: true, applied: false });
        return;
      }

      const preparedKey = emailKeyFromEmail(email);
      const preparedSnapshot = await admin.database().ref(`preparedAccounts/${preparedKey}`).once("value");
      if (!preparedSnapshot.exists()) {
        res.status(200).json({ success: true, applied: false });
        return;
      }

      const preparedAccount = preparedSnapshot.val();
      if (preparedAccount.consumedBy && preparedAccount.consumedBy !== decodedToken.uid) {
        res.status(409).json({ error: "Esta cuenta preparada ya fue aplicada a otro usuario." });
        return;
      }

      if (preparedAccount.status === "applied" && preparedAccount.consumedBy === decodedToken.uid) {
        res.status(200).json({ success: true, applied: false, alreadyApplied: true });
        return;
      }

      const result = await applyPreparedAccountToUser(preparedKey, preparedAccount, {
        uid: decodedToken.uid,
        profile: {
          email,
          displayName: decodedToken.name || "",
          photoURL: decodedToken.picture || "",
        },
      });

      res.status(200).json({
        success: true,
        applied: true,
        uid: result.uid,
        createdLinks: result.createdLinks,
      });
    } catch (error) {
      logger.error("consumePreparedAccount failed", error);
      const missingToken = error.message === "missing-token";
      const message =
        missingToken
          ? "Inicia sesión para aplicar la cuenta preparada."
          : error.message || "No se pudo aplicar la cuenta preparada.";
      res.status(error.status || (missingToken ? 401 : 400)).json({ error: message });
    }
  }
);

exports.submitFeedback = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
  },
  async (req, res) => {
    res.set("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método no permitido." });
      return;
    }

    try {
      const decodedToken = await getUserFromRequest(req);
      const feedback = cleanString(req.body?.feedback);
      if (!feedback) {
        res.status(400).json({ error: "Escribe primero tu sugerencia." });
        return;
      }
      if (feedback.length > 2000) {
        res.status(400).json({ error: "La sugerencia es demasiado larga." });
        return;
      }

      const feedbackRef = admin.database().ref("feedback").push();
      await feedbackRef.set({
        uid: decodedToken.uid,
        email: normalizeEmail(decodedToken.email || ""),
        feedback,
        status: "new",
        createdAt: admin.database.ServerValue.TIMESTAMP,
      });

      res.status(200).json({ success: true, id: feedbackRef.key });
    } catch (error) {
      logger.error("submitFeedback failed", error);
      const missingToken = error.message === "missing-token";
      res.status(missingToken ? 401 : 500).json({
        error: missingToken
          ? "Inicia sesión para enviar una sugerencia."
          : "No se ha podido guardar la sugerencia.",
      });
    }
  }
);

exports.createCheckoutSession = onRequest(
  {
    region: "europe-west1",
    cors: allowedOrigins,
    invoker: functionInvoker,
    secrets: stripeSecretBindings(stripeSecretKey),
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
    secrets: stripeSecretBindings(stripeSecretKey),
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
    secrets: stripeSecretBindings(
      stripeSecretKey,
      stripeWebhookSecret,
      stripeWebhookLegacySecret
    ),
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
    secrets: stripeSecretBindings(stripeSecretKey),
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
