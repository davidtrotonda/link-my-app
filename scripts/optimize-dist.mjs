#!/usr/bin/env node

import { existsSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const excludedDrafts = [
  "llms 2.txt",
  "llms 3.txt",
  "logo-link-my-app.png",
];

for (const filename of excludedDrafts) {
  const target = join(distDir, filename);
  if (existsSync(target)) rmSync(target);
}

const optimizedLogo = join(distDir, "logo-link-my-app.avif");
if (!existsSync(optimizedLogo)) {
  throw new Error("Falta dist/logo-link-my-app.avif; no se desplegará el logo pesado.");
}

console.log(
  `[dist] logo optimizado: ${(statSync(optimizedLogo).size / 1024).toFixed(1)} KB; borradores públicos excluidos`,
);
