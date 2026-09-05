import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Replace the import
content = content.replace('import { useTranslation } from "react-i18next";', 'import { useTranslation } from "react-i18next";\nimport { Helmet } from "react-helmet-async";')

# 2. Replace useSeo definition with SEO component
use_seo_def = r"""function useSeo\(\{
  title,
  description = defaultSeoDescription,
  keywords = defaultSeoKeywords,
  path = "/",
  robots = "index,follow",
  image = brandLogoUrl,
  schema,
\}\) \{
  const \{ i18n \} = useTranslation\(\);
  const language = normalizeLanguage\(i18n.language\);

  useEffect\(\(\) => \{
    const canonical = `\$\{siteUrl\}\$\{localizePath\(path, language\)\}`;
    const fullTitle = title.includes\(brandName\) \? title : `\$\{title\} | \$\{brandName\}`;

    document.documentElement.lang = language;
    document.title = fullTitle;
    upsertMeta\("name", "description", description\);
    upsertMeta\("name", "keywords", keywords\);
    upsertMeta\("name", "robots", robots\);
    upsertMeta\("name", "author", "Skeilapps SL"\);
    upsertMeta\("name", "publisher", "Skeilapps SL"\);
    upsertMeta\("property", "og:locale", \{
      en: "en_US",
      es: "es_ES",
      fr: "fr_FR",
    \}\[language\] \|\| "en_US"\);
    upsertMeta\("property", "og:type", "website"\);
    upsertMeta\("property", "og:site_name", brandName\);
    upsertMeta\("property", "og:title", fullTitle\);
    upsertMeta\("property", "og:description", description\);
    upsertMeta\("property", "og:url", canonical\);
    upsertMeta\("property", "og:image", image\);
    upsertMeta\("name", "twitter:card", "summary_large_image"\);
    upsertMeta\("name", "twitter:title", fullTitle\);
    upsertMeta\("name", "twitter:description", description\);
    upsertMeta\("name", "twitter:image", image\);
    upsertLink\("canonical", canonical\);
    upsertJsonLd\("route-schema", schema\);
  \}, \[title, description, keywords, path, robots, image, schema, language\]\);
\}"""

seo_component = """function SEO({
  title,
  description = defaultSeoDescription,
  keywords = defaultSeoKeywords,
  path = "/",
  robots = "index,follow",
  image = brandLogoUrl,
  schema,
}) {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const canonical = `${siteUrl}${localizePath(path, language)}`;
  const fullTitle = title.includes(brandName) ? title : `${title} | ${brandName}`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Skeilapps SL" />
      <meta name="publisher" content="Skeilapps SL" />
      <meta property="og:locale" content={{ en: "en_US", es: "es_ES", fr: "fr_FR" }[language] || "en_US"} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonical} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}"""

content = re.sub(use_seo_def, seo_component, content)

# 3. Refactor component calls
pattern = r"(\s*)useSeo\((\{.*?\})\);\s*(return\s*\(\s*<[a-zA-Z0-9_.-]+[^>]*>)"
def replacer(match):
    indent = match.group(1)
    props = match.group(2)
    ret_stmt = match.group(3)
    return f"{indent}{ret_stmt}\n{indent}  <SEO {{...{props}}} />"

content = re.sub(pattern, replacer, content, flags=re.DOTALL)

with open('src/App.jsx', 'w') as f:
    f.write(content)
print("Done")
