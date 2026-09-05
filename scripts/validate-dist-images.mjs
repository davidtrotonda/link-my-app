import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const distDirectory = resolve(process.argv[2] || "dist");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".webmanifest", ".xml"]);
const imageReferencePattern = /(?:https?:\/\/[^\s"'`<>]+|\/[^\s"'`<>]+)\.(?:avif|gif|ico|jpe?g|png|svg|webp)(?:\?[^\s"'`<>]*)?/gi;
const localHosts = new Set(["link-my.app", "www.link-my.app"]);

function listFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

function cleanReference(reference) {
  return reference.replace(/[),.;]+$/g, "");
}

function asLocalPath(reference) {
  if (reference.startsWith("/")) return reference.split(/[?#]/, 1)[0];

  const url = new URL(reference);
  return localHosts.has(url.hostname) ? url.pathname : null;
}

async function externalImageIsAvailable(reference) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    let response = await fetch(reference, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    if (response.status === 405) {
      response = await fetch(reference, {
        headers: { Range: "bytes=0-0" },
        redirect: "follow",
        signal: controller.signal,
      });
    }

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

if (!existsSync(distDirectory)) {
  console.error(`No existe el directorio compilado: ${distDirectory}`);
  process.exit(1);
}

const references = new Set();

for (const file of listFiles(distDirectory)) {
  if (!textExtensions.has(extname(file).toLowerCase())) continue;

  const contents = readFileSync(file, "utf8");
  for (const match of contents.matchAll(imageReferencePattern)) {
    references.add(cleanReference(match[0]));
  }
}

const missingLocalImages = [];
const externalImages = [];

for (const reference of references) {
  const localPath = asLocalPath(reference);
  if (localPath) {
    let decodedPath = localPath;
    try {
      decodedPath = decodeURIComponent(localPath);
    } catch {
      // Keep the original path so the missing-file report remains actionable.
    }

    const filePath = join(distDirectory, decodedPath.replace(/^\/+/, ""));
    if (!existsSync(filePath)) missingLocalImages.push(reference);
  } else {
    externalImages.push(reference);
  }
}

const unavailableExternalImages = [];
for (const reference of externalImages) {
  if (!(await externalImageIsAvailable(reference))) unavailableExternalImages.push(reference);
}

if (missingLocalImages.length || unavailableExternalImages.length) {
  if (missingLocalImages.length) {
    console.error("Imágenes locales ausentes:");
    missingLocalImages.forEach((reference) => console.error(`- ${reference}`));
  }

  if (unavailableExternalImages.length) {
    console.error("Imágenes externas no disponibles:");
    unavailableExternalImages.forEach((reference) => console.error(`- ${reference}`));
  }

  process.exit(1);
}

console.log(
  `Imágenes verificadas: ${references.size} referencias (${externalImages.length} externas).`
);
