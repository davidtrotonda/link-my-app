# Skeilink

App React + Firebase para crear smart links de apps. Incluye:

- Autenticacion con Google y email/password.
- Perfil publico por usuario.
- Panel privado para crear, pausar, copiar y eliminar links.
- Redireccion publica por dispositivo desde `/r/:slug`.
- Realtime Database Rules y Firebase Hosting listos para deploy.

## Arrancar en local

```bash
npm install
npm run dev
```

La app queda en `http://localhost:5173`.

## Conectar Firebase

1. Crea un proyecto en Firebase Console.
2. Crea una app web dentro del proyecto.
3. Copia `.env.example` como `.env`.
4. Pega las claves de la app web en `.env`.
5. Activa estos productos:
   - Authentication.
   - Realtime Database.
   - Hosting.

## Proveedores de login

En Firebase Console, entra en **Authentication > Sign-in method** y activa:

- **Google**.
- **Email/Password**.
## Realtime Database

La app usa estas rutas:

- `users/{uid}`: perfil del usuario.
- `links/{linkId}`: smart links creados.
- `clickEvents/{eventId}`: eventos de click creados al redirigir.

Las reglas estan en `database.rules.json`.

## Deploy a Firebase

Primero inicia sesion y enlaza el proyecto:

```bash
npx firebase login
npx firebase use --add
```

Despues despliega:

```bash
npm run deploy
```

Ese comando ejecuta `npm run build` y despues `firebase deploy`, usando:

- `dist` como carpeta publica.
- Rewrite SPA hacia `index.html`.
- Reglas de Realtime Database.

## URLs importantes

- Landing: `/`
- Login: `/login`
- Panel privado: `/dashboard`
- Perfil publico: `/perfil/:uid`
- Smart link: `/r/:slug`
