# Publicación semanal del blog

Este documento es la fuente de verdad de la automatización editorial de Link My App.

## Resultado obligatorio

- Se crea como máximo un artículo por semana, el viernes, con fecha de Madrid.
- La investigación y el artículo maestro se hacen primero en español.
- El mismo artículo se localiza por completo a `en`, `fr`, `ja`, `de`, `pt`, `it`, `ko`, `nl`, `ar` y `hi`.
- La portada es una escena animada React/CSS propia del tema, nunca una imagen raster genérica.
- Los diez artículos históricos de la página 1 no cambian de orden. La entrada nueva se añade al principio de `weeklyBlogManifest`, por lo que aparece como primera tarjeta de la página 2.
- Solo se publica si investigación, contenido, traducciones, animación, build y comprobaciones pasan.

## 1. Evitar ejecuciones duplicadas

Trabajar en `/Users/davidtroton/Documents/Codex/Link My App`, leer `AGENTS.md` y conservar cualquier cambio ajeno.

Antes de investigar:

1. Ejecutar `npm run blog:preflight`. Este paso debe pasar antes de consultar Keyword Planner: confirma que la sesión puede escribir en el proyecto, que la memoria de automatización usa una ruta válida aunque `CODEX_HOME` no esté definido y que existe la identidad técnica local para Firebase sin exponer credenciales.
2. Obtener la fecha y semana ISO en `Europe/Madrid`.
3. Revisar `src/lib/weeklyBlogManifest.js` y `content-workflow/keyword-research/`.
4. Si ya existe una entrada de esa semana o de ese viernes, no crear otra ni desplegar.
5. Ejecutar la comprobación no interactiva incluida en
   `npm run deploy:hosting:unattended` solo después de build. La CLI usa la
   identidad local persistente y el proyecto explícito `skeilink`; nunca
   copiar tokens o claves al repositorio.

## 2. Keyword Planner real

Usar Google Ads Keyword Planner con esta configuración:

- customer ID: `4440561793`
- idioma: español (`1003`)
- ubicación: España (`2724`)
- red: `GOOGLE_SEARCH`

Consultar al menos tres grupos de semillas relacionados con:

1. Enlaces de descarga, smart links, App Store y Google Play.
2. Promoción, adquisición y conversión de apps.
3. QR, medición, atribución, influencers, anuncios y casos de uso.

Obtener al menos 50 ideas combinadas. Guardar sin redondear ni inventar:

- promedio de búsquedas mensuales;
- competencia e índice de competencia;
- puja inferior y superior;
- doce meses de volumen disponibles;
- semillas utilizadas y fecha de consulta.

Excluir navegación de marca, soporte, descargas de otras aplicaciones, búsquedas ambiguas y temas que Link My App no pueda responder con utilidad real. Comparar los candidatos con todos los títulos, slugs, keywords principales e intención de los artículos existentes para evitar canibalización.

Puntuar los candidatos por relevancia para el producto, intención informativa/comercial, ajuste al embudo, demanda, tendencia, competencia y diferenciación editorial. No elegir automáticamente la keyword con más volumen. Registrar los candidatos descartados y el motivo.

Guardar la investigación en:

`content-workflow/keyword-research/YYYY-MM-DD.json`

El JSON debe contener `queriedAt`, `timezone`, `googleAds`, `seeds`, `candidates`, `selected`, `rejected` y `existingContentChecked`.

Si Keyword Planner no responde o no devuelve métricas reales, detener la ejecución sin publicar.

## 3. Artículo maestro en español

Crear una respuesta útil y original a la intención seleccionada:

- respuesta directa en los primeros 100 palabras;
- entre 1.200 y 2.000 palabras cuando la intención lo justifique;
- estructura clara con H2/H3, pasos, ejemplos propios, errores y FAQ;
- keyword principal natural en título, introducción y algún H2, sin sobreoptimización;
- enlaces internos contextuales a Link My App y a guías pertinentes;
- CTA útil y coherente;
- sin estadísticas, resultados, citas o afirmaciones que no se puedan demostrar;
- título SEO conciso, excerpt descriptivo y slug estable en español.

La entrada se añade al principio de `weeklyBlogManifest` en
`src/lib/weeklyBlogManifest.js`, con `publishedAt`, `seo`, `researchFile` y el contenido de cada locale.

## 4. Traducciones

Traducir el artículo completo a los once idiomas de `weeklyBlogLanguages`. Localizar título, excerpt, categoría, tiempo de lectura, introducción, secciones, ejemplos, FAQ y CTA. Mantener el significado y la estructura, pero usar redacción natural del idioma; no copiar español como fallback.

Conservar un único slug para que canonical y hreflang sigan la arquitectura actual.

## 5. Portada animada

Seguir `content-workflow/blog-animation-standard.md`. Crear un componente de portada único en `src/WeeklyBlogPosts.jsx` y registrarlo en `weeklyBlogCoverComponents` con el slug exacto.

## 6. Validar, desplegar y comprobar

Ejecutar:

```sh
npm run blog:check
npm run build
```

Si ambos pasan, desplegar únicamente Hosting de forma no interactiva:

```sh
npm run deploy:hosting:unattended
```

Este comando valida primero que la identidad persistente mantiene acceso a
`skeilink` y aborta sin pedir respuestas si Google revoca las credenciales.

Después del despliegue comprobar:

- `/blog` conserva sus diez tarjetas originales;
- al pulsar página 2, el artículo nuevo es el primero;
- las once rutas localizadas del artículo responden correctamente;
- sitemap, canonical, hreflang, metadescripción y JSON-LD incluyen la entrada;
- portada 16:10 y portada cuadrada no recortan contenido;
- animación funciona y `prefers-reduced-motion` la reduce;
- no hay errores de consola.

El informe final debe incluir keyword y métricas elegidas, archivo de investigación, slug, once URLs, resultado del build y URL de producción.
