import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

export const firebaseReady = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    firebaseConfig.databaseURL
);

export const publicBaseUrl =
  import.meta.env.VITE_PUBLIC_BASE_URL || window.location.origin;
export const stripeCheckoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL || "";
export const stripePortalUrl =
  import.meta.env.VITE_STRIPE_PORTAL_URL ||
  stripeCheckoutUrl.replace("createCheckoutSession", "createPortalSession");
const deriveStripeEndpoint = (endpoint) =>
  stripeCheckoutUrl
    ? stripeCheckoutUrl
        .replace("createCheckoutSession", endpoint)
        .replace(/\/checkout(?=$|\?)/, `/${endpoint}`)
    : "";

export const applyPromoCodeUrl = deriveStripeEndpoint("applyPromoCode");
export const verifyPaymentUrl = deriveStripeEndpoint("verifyPayment");

export const app = firebaseReady ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getDatabase(app) : null;
export const firestore = app ? getFirestore(app) : null;

export const googleProvider = new GoogleAuthProvider();
