#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const targets = ["consumePreparedAccount", "submitFeedback"];
const firebaseCli = resolve("node_modules/firebase-tools/lib/bin/firebase.js");
const only = targets.map((target) => `functions:${target}`).join(",");

const result = spawnSync(
  process.execPath,
  [firebaseCli, "deploy", "--only", only, ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      FIREBASE_DEPLOY_TARGETS: targets.join(","),
      FUNCTIONS_DISCOVERY_TIMEOUT: process.env.FUNCTIONS_DISCOVERY_TIMEOUT || "60",
    },
  }
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
