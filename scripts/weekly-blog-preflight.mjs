#!/usr/bin/env node

import {
  constants,
  existsSync,
  mkdirSync,
  rmSync,
  statSync,
  writeFileSync,
  accessSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const automationId = "link-my-app-blog-viernes-11";
const codexHome =
  process.env.CODEX_HOME && process.env.CODEX_HOME.trim()
    ? process.env.CODEX_HOME
    : join(homedir(), ".codex");
const automationMemoryDir = join(codexHome, "automations", automationId);
const dedicatedAdcPath = join(
  homedir(),
  "Library",
  "Application Support",
  "Codex",
  "gcloud-link-my-app",
  "application_default_credentials.json",
);

const failures = [];

function fail(message) {
  failures.push(message);
}

function checkWritableDirectory(label, dir) {
  try {
    if (!existsSync(dir)) {
      fail(`${label}: no existe ${dir}`);
      return;
    }

    accessSync(dir, constants.R_OK | constants.W_OK);

    const testFile = join(dir, `.weekly-blog-write-test-${process.pid}`);
    writeFileSync(testFile, "ok\n", { flag: "wx" });
    rmSync(testFile, { force: true });
  } catch (error) {
    fail(`${label}: no se puede escribir (${error.message})`);
  }
}

function ensureWritableDirectory(label, dir) {
  try {
    mkdirSync(dir, { recursive: true });
  } catch (error) {
    fail(`${label}: no se pudo crear ${dir} (${error.message})`);
    return;
  }

  checkWritableDirectory(label, dir);
}

[
  ["raiz del proyecto", repoRoot],
  ["investigacion de keywords", join(repoRoot, "content-workflow", "keyword-research")],
  ["codigo fuente", join(repoRoot, "src")],
  ["manifiesto del blog", join(repoRoot, "src", "lib")],
  ["archivos publicos", join(repoRoot, "public")],
  ["build de produccion", join(repoRoot, "dist")],
].forEach(([label, dir]) => checkWritableDirectory(label, dir));

ensureWritableDirectory("memoria de automatizacion", automationMemoryDir);

if (!existsSync(dedicatedAdcPath)) {
  fail("Firebase ADC: falta el archivo de credenciales dedicado");
} else {
  const credentialMode = statSync(dedicatedAdcPath).mode & 0o777;
  if ((credentialMode & 0o077) !== 0) {
    fail("Firebase ADC: el archivo debe ser privado para el usuario actual");
  }
}

if (failures.length) {
  console.error("[blog:preflight] no se puede iniciar la publicacion semanal:");
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log("[blog:preflight] escritura local verificada.");
console.log(`[blog:preflight] memoria lista en ${join(automationMemoryDir, "memory.md")}.`);
console.log("[blog:preflight] Firebase ADC dedicado presente y privado.");
