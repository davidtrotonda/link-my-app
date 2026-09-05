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
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  de: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  pt: [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ],
  it: [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
  ],
  ko: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  nl: [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ],
  ar: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  hi: [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
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
  if (lang === "ja") return `${year}年${monthName}${day}日`;
  if (lang === "de") return `${day}. ${monthName} ${year}`;
  if (lang === "pt") return `${day} de ${monthName} de ${year}`;
  if (lang === "it") return `${day} ${monthName} ${year}`;
  if (lang === "ko") return `${year}년 ${monthName} ${day}일`;
  if (lang === "nl") return `${day} ${monthName} ${year}`;
  if (lang === "ar") return `${day} ${monthName} ${year}`;
  if (lang === "hi") return `${day} ${monthName} ${year}`;
  return `${monthName} ${day}, ${year}`;
}

/** Formats a fixed ISO publication date in the same style as legacy blog dates. */
export function formatBlogDateLabel(isoDate, language = "en") {
  const [yearValue, monthValue, dayValue] = String(isoDate).split("-").map(Number);
  if (!yearValue || !monthValue || !dayValue) return String(isoDate || "");

  const lang = monthNames[language] ? language : "en";
  const monthName = monthNames[lang][monthValue - 1];

  if (lang === "es") return `${dayValue} de ${monthName}, ${yearValue}`;
  if (lang === "fr") return `${dayValue} ${monthName.toLowerCase()} ${yearValue}`;
  if (lang === "ja") return `${yearValue}年${monthName}${dayValue}日`;
  if (lang === "de") return `${dayValue}. ${monthName} ${yearValue}`;
  if (lang === "pt") return `${dayValue} de ${monthName} de ${yearValue}`;
  if (["it", "nl", "ar", "hi"].includes(lang)) return `${dayValue} ${monthName} ${yearValue}`;
  if (lang === "ko") return `${yearValue}년 ${monthName} ${dayValue}일`;
  return `${monthName} ${dayValue}, ${yearValue}`;
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
  if (lang === "ja") return `${year}年${month}`;
  if (lang === "pt") return `${month} de ${year}`;
  if (lang === "ko") return `${year}년 ${month}`;
  if (lang === "nl") return `${month} ${year}`;
  if (lang === "ar") return `${month} ${year}`;
  if (lang === "hi") return `${month} ${year}`;
  return `${month} ${year}`;
}
