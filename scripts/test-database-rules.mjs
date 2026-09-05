import fs from "node:fs";
import process from "node:process";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  set,
  update,
} from "firebase/database";

const projectId = process.env.GCLOUD_PROJECT || "demo-link-my-app-rules-test";
const rules = fs.readFileSync("database.rules.json", "utf8");
const testEnv = await initializeTestEnvironment({
  projectId,
  database: { rules },
});

const ownerId = "owner-1";
const strangerId = "stranger-1";
const linkId = "link-1";
const activeLink = {
  ownerId,
  ownerEmail: "owner@example.com",
  title: "App de prueba",
  slug: "app-prueba",
  iosUrl: "https://apps.apple.com/app/id1",
  androidUrl: "https://play.google.com/store/apps/details?id=test",
  fallbackUrl: "https://example.com/download",
  active: true,
  createdAt: 1,
  updatedAt: 1,
};
const publicLink = {
  ownerId,
  title: activeLink.title,
  slug: activeLink.slug,
  iosUrl: activeLink.iosUrl,
  androidUrl: activeLink.androidUrl,
  fallbackUrl: activeLink.fallbackUrl,
  active: true,
  createdAt: 1,
  updatedAt: 1,
};

try {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await set(ref(context.database()), {
      users: {
        [ownerId]: {
          uid: ownerId,
          displayName: "Propietario",
          email: "owner@example.com",
          emailNormalized: "owner@example.com",
          public: true,
          stripeCustomerId: "cus_private",
        },
      },
      publicProfiles: {
        [ownerId]: {
          uid: ownerId,
          displayName: "Propietario",
          public: true,
          updatedAt: 1,
        },
      },
      links: { [linkId]: activeLink },
      publicLinks: { [linkId]: publicLink },
    });
  });

  const anonymousDb = testEnv.unauthenticatedContext().database();
  const ownerDb = testEnv.authenticatedContext(ownerId, {
    email: "owner@example.com",
  }).database();
  const strangerDb = testEnv.authenticatedContext(strangerId, {
    email: "stranger@example.com",
  }).database();

  const redirectSnapshot = await assertSucceeds(
    get(query(ref(anonymousDb, "publicLinks"), orderByChild("slug"), equalTo("app-prueba")))
  );
  const redirectData = redirectSnapshot.val()?.[linkId];
  if (redirectData?.fallbackUrl !== activeLink.fallbackUrl) {
    throw new Error("La consulta pública no devolvió el destino esperado.");
  }
  if (redirectData.ownerEmail || redirectData.stripeCustomerId) {
    throw new Error("La capa pública contiene datos privados.");
  }

  await assertFails(
    get(query(ref(anonymousDb, "links"), orderByChild("slug"), equalTo("app-prueba")))
  );
  await assertFails(get(ref(strangerDb, `links/${linkId}`)));
  await assertSucceeds(get(ref(ownerDb, `links/${linkId}`)));
  await assertFails(get(ref(anonymousDb, `users/${ownerId}`)));
  await assertSucceeds(get(ref(anonymousDb, `publicProfiles/${ownerId}`)));
  await assertFails(
    update(ref(ownerDb, `users/${ownerId}`), {
      stripeCustomerId: null,
    })
  );

  await assertFails(
    set(ref(ownerDb, "publicLinks/javascript-link"), {
      ...publicLink,
      slug: "javascript-link",
      fallbackUrl: "javascript:alert(1)",
    })
  );
  await assertFails(
    set(ref(ownerDb, "publicLinks/email-leak"), {
      ...publicLink,
      slug: "email-leak",
      ownerEmail: "owner@example.com",
    })
  );

  await assertSucceeds(
    update(ref(ownerDb), {
      [`links/${linkId}/active`]: false,
      [`links/${linkId}/updatedAt`]: 2,
      [`publicLinks/${linkId}`]: null,
    })
  );
  const disabledSnapshot = await assertSucceeds(
    get(query(ref(anonymousDb, "publicLinks"), orderByChild("slug"), equalTo("app-prueba")))
  );
  if (disabledSnapshot.exists()) {
    throw new Error("Un enlace desactivado sigue visible en la capa pública.");
  }

  console.log("Reglas verificadas: redirección pública, privacidad, URLs y desactivación.");
} finally {
  await testEnv.cleanup();
}
