# Estándar de portadas animadas

Las portadas del blog de Link My App son mini-escenas React/CSS, no imágenes raster. Cada escena debe explicar visualmente la idea del artículo.

## Narrativa

Representar entre tres y cinco estados legibles: origen o problema, acción/enrutado y resultado. La animación debe aportar significado; evitar partículas o movimiento puramente decorativo.

## Construcción

- Funcionar en tarjeta `16:10` y hero cuadrado sin elementos cortados.
- Usar entre 5 y 10 elementos animados como objetivo.
- Usar al menos 3 animaciones con tiempos escalonados.
- Bucle base de 3 a 6 segundos; una órbita secundaria puede llegar a 12 segundos.
- Prefijar todos los `@keyframes` con una abreviatura única del slug para evitar colisiones.
- Preferir formas, rutas SVG, tarjetas, nodos, tiendas y métricas simples.
- Mantener poco texto y hacerlo independiente del idioma cuando sea posible.
- Conservar el lenguaje visual existente: fondo claro o degradado suave, tarjetas blancas, bordes finos, sombras contenidas y acentos de color.
- No cargar GIF, vídeo, canvas o bibliotecas de animación.

## Rendimiento y accesibilidad

- Animar `transform`, `opacity` y propiedades SVG; evitar cambios continuos de layout.
- La tarjeta inactiva debe quedar pausada y activarse al ser destacada o al pasar el cursor.
- El hero puede ejecutarse continuamente.
- El CSS global de `.blog-cover` debe respetar `prefers-reduced-motion`.
- No comunicar información esencial solo mediante color o movimiento.

## QA visual

Comprobar a 375 px, 768 px y escritorio:

1. No hay overflow, texto cortado ni elementos fuera de la escena.
2. El primer frame comunica el tema incluso sin movimiento.
3. La secuencia completa se entiende en menos de seis segundos.
4. Los nombres de keyframes no existen en otras portadas.
5. La pestaña Consola no muestra errores.

