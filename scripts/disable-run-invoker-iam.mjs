import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT;
const region = process.env.FIREBASE_FUNCTIONS_REGION || "europe-west1";
const services = [
  "createcheckoutsession",
  "createportalsession",
  "stripewebhook",
  "applypromocode",
  "verifypayment",
];
const configPath = path.join(
  os.homedir(),
  ".config",
  "configstore",
  "firebase-tools.json"
);

if (!projectId) {
  throw new Error(
    "Set FIREBASE_PROJECT_ID before running this script, for example: FIREBASE_PROJECT_ID=your-project npm run deploy:run-public"
  );
}

function getFirebaseAccessToken() {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const token = config.tokens?.access_token || config.user?.tokens?.access_token;

  if (!token) {
    throw new Error("No se ha encontrado token de Firebase CLI. Ejecuta firebase login.");
  }

  return token;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`${response.status} ${JSON.stringify(body)}`);
  }

  return body;
}

async function getService(service, token) {
  return requestJson(
    `https://run.googleapis.com/v1/projects/${projectId}/locations/${region}/services/${service}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

async function disableInvokerIam(service, token) {
  const current = await getService(service, token);
  delete current.status;

  current.metadata.annotations = {
    ...(current.metadata.annotations || {}),
    "run.googleapis.com/invoker-iam-disabled": "true",
  };

  await requestJson(
    `https://run.googleapis.com/v1/projects/${projectId}/locations/${region}/services/${service}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(current),
    }
  );
}

async function waitUntilReady(token) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const states = await Promise.all(
      services.map(async (service) => {
        const current = await getService(service, token);
        const ready = current.status?.conditions?.find(
          (condition) => condition.type === "Ready"
        );
        return `${service}:${ready?.status || "Unknown"}`;
      })
    );

    console.log(states.join(" "));

    if (states.every((state) => state.endsWith(":True"))) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  throw new Error("Cloud Run no terminó de quedar listo a tiempo.");
}

const token = getFirebaseAccessToken();

for (const service of services) {
  await disableInvokerIam(service, token);
  console.log(`${service}: invoker IAM check desactivado`);
}

await waitUntilReady(token);
