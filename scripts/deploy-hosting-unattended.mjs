#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const dedicatedAdcPath = join(
  homedir(),
  "Library",
  "Application Support",
  "Codex",
  "gcloud-link-my-app",
  "application_default_credentials.json",
);
const firebaseCredentialsPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || dedicatedAdcPath;

if (!existsSync(firebaseCredentialsPath)) {
  console.error(
    "[deploy:hosting:unattended] Dedicated Firebase ADC credentials are missing.",
  );
  process.exit(1);
}

const credentialMode = statSync(firebaseCredentialsPath).mode & 0o777;
if ((credentialMode & 0o077) !== 0) {
  console.error(
    "[deploy:hosting:unattended] Dedicated Firebase ADC credentials must be readable only by the current user (chmod 600).",
  );
  process.exit(1);
}

const firebaseEnv = {
  ...process.env,
  GOOGLE_APPLICATION_CREDENTIALS: firebaseCredentialsPath,
};

const firebaseArgs = [
  "firebase",
  "deploy",
  "--only",
  "hosting",
  "--project",
  "skeilink",
  "--non-interactive",
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    ...options,
  });

  if (result.status !== 0) {
    if (result.stdout) process.stderr.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }

  return result;
}

// Fail before uploading if the stored Firebase identity can no longer access
// the exact production project. The project list remains private, while known
// authentication failures receive a useful, credential-free explanation.
const accessCheck = spawnSync(
  "npx",
  [
    "firebase",
    "hosting:sites:list",
    "--project",
    "skeilink",
    "--json",
    "--non-interactive",
  ],
  {
    cwd: process.cwd(),
    encoding: "utf8",
    env: firebaseEnv,
    stdio: ["ignore", "pipe", "pipe"],
  },
);

if (accessCheck.status !== 0) {
  const output = `${accessCheck.stdout || ""}\n${accessCheck.stderr || ""}`;

  if (
    /authentication error|credentials are no longer valid|login --reauth/i.test(
      output,
    )
  ) {
    console.error(
      "[deploy:hosting:unattended] Firebase ADC access for skeilink has expired. Refresh the dedicated ADC impersonation for link-my-app-blog-publisher, then retry.",
    );
  } else {
    console.error(
      `[deploy:hosting:unattended] Firebase access verification failed for skeilink (exit ${accessCheck.status || 1}).`,
    );
  }

  process.exit(accessCheck.status || 1);
}

console.log("[deploy:hosting:unattended] Firebase access verified for skeilink.");
run("npx", firebaseArgs, { env: firebaseEnv, stdio: "inherit" });
