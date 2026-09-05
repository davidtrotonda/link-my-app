# Recuperar link-my-app

Esta es una instantánea de recuperación del trabajo local, no una versión validada para producción.

Capturada: 2026-09-05T16:06:29.718930+02:00

1. Clonar este repositorio y crear una rama desde la etiqueta de respaldo indicada en el registro.
2. Recuperar las claves y los archivos de entorno desde la carpeta privada de Drive y volver a iniciar sesión en los servicios.
3. Consultar package.json, los archivos de versiones y el registro de conexiones antes de instalar o ejecutar comandos.
4. Validar localmente los cambios antes de publicar. En TienRank, el prebuild puede ejecutar migraciones contra la base de datos; no usar credenciales de producción para una prueba de recuperación.

Los archivos omitidos se detallan en manifest.json. Una omisión de iCloud no prueba que su versión local sea idéntica a la conservada por Git. Los datos de usuarios permanecen en los servicios externos registrados.
