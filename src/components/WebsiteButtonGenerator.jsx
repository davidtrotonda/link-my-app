import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { localizePath } from "../lib/i18nRoutes.js";
import { trackAnalyticsEvent } from "../lib/landingAnalytics.js";
import {
  buildWebsiteButtonMarkup,
  parseWebsiteButtonUrl,
  websiteButtonExample,
  websiteButtonStyle,
} from "../lib/websiteButtons.js";

const modes = ["stores", "smart"];
const storeFields = ["ios", "android"];
const smartFields = ["smart"];
const placeholders = { ...websiteButtonExample, smart: "https://link-my.app/your-app" };

export default function WebsiteButtonGenerator({ language }) {
  const { t } = useTranslation("translation", { keyPrefix: "websiteButtonGenerator" });
  const [mode, setMode] = useState("stores");
  const [values, setValues] = useState({ ios: "", android: "", smart: "" });
  const [status, setStatus] = useState("");
  const output = useRef(null);

  const fields = (mode === "stores" ? storeFields : smartFields).map((id) => {
    const value = values[id];
    const href = parseWebsiteButtonUrl(value, id);
    return { id, value, href, invalid: Boolean(value.trim() && !href), label: t(`buttons.${id}`) };
  });
  const buttons = fields.filter((field) => field.href);
  const html = fields.some((field) => field.invalid) ? "" : buildWebsiteButtonMarkup(buttons);

  function recordCopy() {
    setStatus("copied");
    trackAnalyticsEvent("website_button_html_copied", {
      guide_language: language,
      button_mode: mode,
    });
  }

  async function copyHtml() {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      recordCopy();
    } catch {
      output.current?.focus();
      output.current?.select();
      setStatus("copyManually");
    }
  }

  function handleManualCopy(event) {
    const { selectionStart, selectionEnd } = event.currentTarget;
    if (html && selectionStart === 0 && selectionEnd === html.length && !event.defaultPrevented) {
      recordCopy();
    }
  }

  return (
    <section
      id="download-button-generator"
      aria-labelledby="download-button-generator-title"
      className="relative mx-auto w-full max-w-[1100px] scroll-mt-28 px-5 pb-8 md:px-8"
    >
      <div className="rounded-[28px] border border-black/10 bg-[#fafaf8] p-5 md:p-8">
        <h2 id="download-button-generator-title" className="text-2xl font-black tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">{t("difference")}</p>
        <Link to={localizePath("/#crear", language)} className="mt-2 inline-block text-sm font-bold underline underline-offset-4">
          {t("createSmartLink")}
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="min-w-0 space-y-4">
            <fieldset>
              <legend className="mb-2 text-sm font-bold">{t("modeLabel")}</legend>
              <div className="flex flex-wrap gap-3">
                {modes.map((option) => (
                  <label key={option} className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm font-medium">
                    <input
                      type="radio"
                      name="button-mode"
                      value={option}
                      checked={mode === option}
                      onChange={() => {
                        setMode(option);
                        setStatus("");
                      }}
                      className="accent-black"
                    />
                    {t(`modes.${option}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            {fields.map(({ id, value, invalid }) => (
              <div key={id}>
                <label htmlFor={`website-button-${id}`} className="block text-sm font-bold">
                  {t(`fields.${id}`)}
                </label>
                <input
                  id={`website-button-${id}`}
                  name={`website-button-${id}`}
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={value}
                  placeholder={placeholders[id]}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? `website-button-error-${id}` : undefined}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setValues((current) => ({ ...current, [id]: nextValue }));
                    setStatus("");
                  }}
                  className="mt-1.5 block w-full min-w-0 rounded-xl border border-black/20 bg-white px-3 py-2.5 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                />
                {invalid && (
                  <span id={`website-button-error-${id}`} className="mt-1 block text-xs font-medium text-red-800">
                    {t(`errors.${id}`)}
                  </span>
                )}
              </div>
            ))}

            {mode === "stores" && (
              <button
                type="button"
                className="text-sm font-bold underline underline-offset-4"
                onClick={() => {
                  setValues((current) => ({ ...current, ...websiteButtonExample }));
                  setStatus("");
                }}
              >
                {t("example")}
              </button>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold">{t("preview")}</h3>
            <div className="mt-2 min-h-20 rounded-xl border border-black/10 bg-white p-2.5">
              {buttons.length ? buttons.map(({ id, label, href }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
                  style={websiteButtonStyle}
                  className="cursor-pointer border-0"
                >
                  {label}
                </button>
              )) : <p className="px-1 py-2 text-sm text-black/65">{t("emptyPreview")}</p>}
            </div>
            <label className="mt-4 block text-sm font-bold">
              {t("html")}
              <textarea
                ref={output}
                readOnly
                rows={4}
                value={html}
                onCopy={handleManualCopy}
                className="mt-2 block w-full rounded-xl border border-black/20 bg-white p-3 font-mono text-sm font-normal leading-5"
              />
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={!html}
                onClick={copyHtml}
                className="rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("copy")}
              </button>
              <p role="status" className="text-sm font-medium text-black/75">
                {status && t(status)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
