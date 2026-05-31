export function cleanCustomUrl(value) {
  let output = value.trim().toLowerCase();
  output = output.replace("https://", "").replace("http://", "");
  output = output.replace(/^www\./, "");
  output = output.split(" ").join("");

  while (output.endsWith("/")) {
    output = output.slice(0, -1);
  }

  return output.slice(0, 80);
}

export function slugFromInput(value) {
  const cleaned = cleanCustomUrl(value);
  const withoutDomain = cleaned
    .replace(/^link-my\.app\//, "")
    .replace(/^.*\/r\//, "")
    .replace(/^.*\//, "");

  return withoutDomain
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function publicLinkForSlug(baseUrl, slug) {
  return `${baseUrl.replace(/\/$/, "")}/${slug}`;
}

export function profileLinkForUser(baseUrl, uid) {
  return `${baseUrl.replace(/\/$/, "")}/perfil/${uid}`;
}

export function detectDestination(userAgent = navigator.userAgent) {
  const agent = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(agent)) {
    return "ios";
  }

  if (/android/.test(agent)) {
    return "android";
  }

  return "fallback";
}
