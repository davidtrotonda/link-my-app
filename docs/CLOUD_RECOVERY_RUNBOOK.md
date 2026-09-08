# Link My App: continuidad y recuperación web

Esta guía permite recuperar el proyecto desde GitHub y volver a conectar su
infraestructura web. GitHub es el historial de cambios: no se mantiene un
registro de producción separado. Link My App no necesita compilaciones Android
ni iOS.

## Estado verificado

- Repositorio: `https://github.com/davidtrotonda/link-my-app`
- Rama de producción: `main`
- Fuente recuperada y comparada con producción:
  `877dff7f194faf2807c2578f5aa6eb8838697e7f`
- Web pública: `https://link-my.app`
- Worker: `link-my-app-smart-redirect-v2`
- Versión de Worker observada al recuperar el proyecto: `b632e8a7`
- Proyecto Vercel: `link-my-app-frontdoor`
- Despliegue Vercel observado: `dpl_8p5gjbysRb4aYeNeschiNgUDgJ5c`
- Proyecto Firebase: `skeilink`
- Hosting de reversión: `https://skeilink.web.app`

Los identificadores anteriores sirven para reconocer los recursos correctos;
pueden cambiar después de un despliegue legítimo. El commit de GitHub y el
despliegue asociado son la referencia actual.

## Arquitectura

1. El dominio público entra por Vercel.
2. `vercel-frontdoor/vercel.json` reenvía todas las rutas al Worker de
   Cloudflare y añade `X-Link-My-App-Frontdoor: vercel`.
3. Cloudflare sirve los archivos generados en `dist/` y ejecuta la lógica de
   enlaces inteligentes.
4. Firebase proporciona Auth, Realtime Database y Functions. Firebase Hosting
   conserva un origen de reversión.

El frontend se despliega en Cloudflare. Vercel solo cambia cuando cambia la
configuración del front door.

## Flujo habitual de cambios

1. Crear una rama desde `main`.
2. Hacer el cambio y ejecutar `.codex/maintenance.sh`.
3. Subir la rama y abrir un pull request.
4. Revisar las comprobaciones y cualquier vista previa disponible.
5. Pedir aprobación explícita antes de fusionar o publicar en producción.
6. Fusionar en `main` y dejar que el proveedor conectado despliegue.
7. Verificar `https://link-my.app`, una ruta pública y un enlace inteligente.

No se crea un documento por cada cambio: commits, pull requests y despliegues
del proveedor ya conservan esa trazabilidad.

## Recuperación en un ordenador nuevo

1. Instalar Git y Node.js 24.
2. Clonar `davidtrotonda/link-my-app` y cambiar a `main`.
3. Ejecutar `.codex/setup.sh`.
4. Restaurar las variables de entorno desde los gestores de secretos de los
   proveedores; nunca copiarlas desde documentación ni subirlas a Git.
5. Ejecutar `.codex/maintenance.sh`.
6. Confirmar que el remoto `origin` apunta al repositorio correcto.

## GitHub y Codex Cloud

- Autorizar el repositorio `davidtrotonda/link-my-app` en Codex Cloud.
- Usar Node.js 24 y `.codex/setup.sh` como preparación del entorno.
- Usar `.codex/maintenance.sh` para validar sin publicar.
- Conservar el trabajo en ramas y pull requests; `main` es la fuente
  recuperable.

Prompt recomendado:

> Trabaja en una rama de Link My App. Ejecuta las comprobaciones web del
> repositorio, abre un pull request y no fusiones ni publiques en producción sin
> mi aprobación explícita. No crees builds Android/iOS ni un historial de
> producción separado.

## Recuperar Cloudflare

Cuenta: `Info@skeilapps.com's Account`

Recursos que deben existir:

- Worker `link-my-app-smart-redirect-v2`
- KV `link-my-app-edge-links-kv`
- D1 `link-my-app-edge-analytics-db`
- Configuración en `cloudflare-smart-redirect/wrangler.jsonc`

Procedimiento:

1. Conectar el repositorio GitHub y seleccionar `main` como rama de producción.
2. Usar la raíz del repositorio.
3. Comando de compilación: `npm ci --no-audit --no-fund && npm run build && npm run seo:check && npm run test:worker && npm exec -- tsc -p cloudflare-smart-redirect/tsconfig.json`.
4. Comando de despliegue: `npm exec -- wrangler deploy --config cloudflare-smart-redirect/wrangler.jsonc`.
5. Aplicar las migraciones D1 de forma controlada cuando haya nuevas
   migraciones: `npm run cloudflare:migrate`.
6. Confirmar KV, D1, variables y secretos antes del primer despliegue.
7. Probar primero con `wrangler deploy --dry-run` y solicitar aprobación antes
   de publicar.

La URL técnica del Worker es
`https://link-my-app-smart-redirect-v2.ancient-wave-c097.workers.dev`.

## Recuperar Vercel

1. Abrir el proyecto `link-my-app-frontdoor`.
2. Conectarlo a `davidtrotonda/link-my-app` con rama de producción `main`.
3. Establecer `vercel-frontdoor` como Root Directory.
4. No configurar un build de Vite: este proyecto solo contiene `vercel.json`.
5. Confirmar los dominios `link-my.app` y `www.link-my.app`.
6. Tras desplegar, comprobar el encabezado
   `X-Link-My-App-Frontdoor: vercel` y que las rutas llegan al Worker.

## Recuperar Firebase

1. Seleccionar el proyecto `skeilink` definido en `.firebaserc`.
2. Restaurar el acceso a Auth, Realtime Database y Functions.
3. Revisar reglas y emuladores antes de publicar cambios de base de datos.
4. Mantener `https://skeilink.web.app` como origen de reversión.
5. No desplegar Firebase Hosting como frontend principal salvo reversión
   consciente.

## Variables y secretos

La lista de nombres está en `.env.example`. Incluye la configuración pública de
Firebase para Vite, URLs de Functions y Stripe, correos administrativos y
orígenes del backend. Los valores reales viven únicamente en los proveedores o
en un gestor de secretos.

Cloudflare también requiere sus bindings de KV y D1 y cualquier secreto que use
el Worker. Vercel no debe necesitar secretos de la aplicación para su función de
front door.

## Verificación posterior a un despliegue

- `https://link-my.app` responde correctamente.
- El encabezado `X-Link-My-App-Frontdoor` identifica Vercel.
- Los recursos estáticos se sirven desde la versión nueva del Worker.
- Una ruta localizada conserva título, descripción y canonical.
- Un enlace inteligente abre el destino correcto.
- Auth y lectura/escritura autorizada en Firebase siguen funcionando.
- No hay secretos en el diff ni en los registros de compilación.

Si una verificación falla, detener el despliegue, conservar las evidencias en el
pull request y volver al despliegue anterior del proveedor. No reescribir el
historial de GitHub.
