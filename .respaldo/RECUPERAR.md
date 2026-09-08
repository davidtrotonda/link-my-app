# Recuperar link-my-app

Esta etiqueta conserva el trabajo local guardado en disco, incluyendo cambios pendientes. No es una versión validada para producción.

1. Clonar davidtrotonda/link-my-app y crear una rama desde esta etiqueta.
2. Recuperar claves y configuración del paquete privado en Drive: https://drive.google.com/file/d/1NQKTfgNVP64xMDv_6YYA3zrerHIikvO2/view
3. Instalar dependencias con las versiones y lockfiles del proyecto.
4. Volver a iniciar sesión en los mismos proveedores existentes; no recrear bases de datos.
5. Leer los AGENTS.md y probar con credenciales de desarrollo antes de publicar. En TienRank, npm run build puede ejecutar migraciones de producción en prebuild: no usarlo como prueba automática.

Las omisiones figuran en manifest.json. Se conservan los servicios de la nube y sus datos; no están dentro de Git. La pérdida de este Mac no elimina esos servicios.
