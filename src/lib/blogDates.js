// Helpers to keep blog post dates "fresh" every month so search engines
// always see the content as recently updated. Each post gets a deterministic
// random day within the current month (never in the future), so the same
// post always shows the same date during a given month, but each post has
// its own day to look natural.

const monthNames = {
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
};

/** Deterministic non-crypto hash of a string. Same input -> same output. */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Returns a deterministic day-of-month for a given slug in the current month.
 * - Always between 1 and the lesser of (today's day, 28).
 * - Same slug + same month -> same day (won't flicker on re-renders).
 * - Different slugs -> different days (looks natural in a list).
 * - Never returns a future date.
 */
export function getDeterministicDayForSlug(slug = "", now = new Date()) {
  const todayDay = now.getUTCDate();
  const maxDay = Math.min(28, Math.max(1, todayDay));
  const monthKey = `${now.getUTCFullYear()}-${now.getUTCMonth()}`;
  const seed = hashString(`${slug}::${monthKey}`);
  return (seed % maxDay) + 1;
}

/** Returns an ISO date (YYYY-MM-DD) for the deterministic day of a post. */
export function getDateForSlugISO(slug = "", now = new Date()) {
  const day = getDeterministicDayForSlug(slug, now);
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

/**
 * Returns a human-readable "DD <Month> YYYY" label for a post slug in the
 * requested language. Example: "12 de Mayo, 2026" / "May 12, 2026" / "12 mai 2026".
 */
export function getDateForSlugLabel(slug = "", language = "en", now = new Date()) {
  const lang = monthNames[language] ? language : "en";
  const day = getDeterministicDayForSlug(slug, now);
  const monthName = monthNames[lang][now.getUTCMonth()];
  const year = now.getUTCFullYear();

  if (lang === "es") return `${day} de ${monthName}, ${year}`;
  if (lang === "fr") return `${day} ${monthName.toLowerCase()} ${year}`;
  return `${monthName} ${day}, ${year}`;
}

/** Returns today's date in YYYY-MM-DD (ISO 8601). */
export function getTodayISO(now = new Date()) {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns a human-readable month + year string for the current month
 * in the requested language. Example: "Mayo 2026" / "May 2026" / "Mai 2026".
 */
export function getCurrentMonthLabel(language = "en", now = new Date()) {
  const lang = monthNames[language] ? language : "en";
  const month = monthNames[lang][now.getUTCMonth()];
  const year = now.getUTCFullYear();
  return `${month} ${year}`;
}
