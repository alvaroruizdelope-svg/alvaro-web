# SEO de AV CODE STUDIO

URL canónica: https://alvaro-web.pages.dev/

## Configuración

- `index.html`: título local, descripción de 156 caracteres, canonical absoluta, Open Graph y Twitter Card. La imagen social utiliza la fotografía real `img/alvaro-perfil.png` (1122 × 1402); la tarjeta `summary` es adecuada para una imagen de perfil. No se crea una imagen de proyecto ni se presenta Gym Force como un cliente.
- JSON-LD en `index.html`: `WebSite`, `Person` (Álvaro, con AV CODE STUDIO como nombre profesional) y `Service`, relacionados mediante identificadores. Describe el servicio en Valdepeñas y la provincia de Ciudad Real. No declara empresa legal, dirección postal, reseñas ni experiencia inventada. Este marcado no garantiza resultados enriquecidos.
- Un único H1, seguido de H2 para las secciones y H3 para servicios, proyecto y pasos.
- `sitemap.xml`: solo la portada. Los enlaces con `#` son secciones, no páginas independientes. El archivo de verificación no forma parte del sitemap. No se inventa una frecuencia de actualización ni se cambia `lastmod` automáticamente.
- `robots.txt`: permite el rastreo e identifica el sitemap con URL absoluta. No es un mecanismo de seguridad ni obliga a Google a indexar.
- Fotografías con `alt`, dimensiones, `loading="lazy"` y `decoding="async"`. Gym Force aparece en el HTML original, sin depender de JavaScript. Se conservan los PNG originales y su calidad; la optimización aplicada afecta a cuándo se descargan y al espacio reservado, no al peso de los archivos.
- `google0bf7a7e5d25fad9f.html`: conservado sin cambios.

No se modifican el CSS, la marca, los botones ni los destinos de contacto. Los textos locales se añaden a la presentación del servicio sin repetir palabras clave en todas las secciones.

## Comprobar tras el despliegue de Cloudflare

1. Confirma en Cloudflare Pages que el despliegue corresponde al último commit de `main`. No necesitas compilación ni plugins.
2. Abre https://alvaro-web.pages.dev/robots.txt y https://alvaro-web.pages.dev/sitemap.xml. Deben devolver sus contenidos reales, no la portada. En la pestaña Red del navegador comprueba estado 200 y tipos de contenido de texto/XML. Pages sirve los archivos estáticos de la raíz directamente, sin reglas SPA adicionales.
3. Abre https://alvaro-web.pages.dev/google0bf7a7e5d25fad9f.html y verifica que mantiene el texto de verificación.
4. En el código fuente de la portada comprueba título, descripción, canonical, `og:url`, imagen social y JSON-LD. Revisa también las cabeceras de respuesta: no debe existir un `X-Robots-Tag: noindex` en producción. Esto puede depender de reglas configuradas fuera del repositorio. Las previews de Pages pueden tener restricciones de indexación; utiliza la URL de producción.
5. Abre las URLs de las imágenes sociales para comprobar que se sirven públicamente. WhatsApp y otras redes pueden conservar vistas previas antiguas en caché.
6. En **Google Search Console → Sitemaps**, envía `https://alvaro-web.pages.dev/sitemap.xml`. En **Inspección de URLs**, inspecciona la portada, ejecuta la prueba en directo y revisa la canonical declarada y la elegida por Google. Puedes solicitar una nueva indexación después del despliegue; no es necesario repetir la solicitud continuamente.
7. Pega la URL en https://validator.schema.org/ para revisar el JSON-LD publicado. La prueba de resultados enriquecidos de Google solo reconoce sus tipos compatibles; no tener un resultado enriquecido no significa que `Service` o `Person` sean inválidos.
8. Comprueba móvil con PageSpeed Insights y revisa consultas, impresiones y clics en Search Console con el tiempo. Las mejoras técnicas no garantizan posiciones ni plazos.

## Validación de este cambio

Se ejecutan validación HTML, comprobación sintáctica del JSON-LD y de sus referencias, lectura XML del sitemap, reglas del archivo robots, rutas locales, conservación de la verificación y pruebas de navegador con y sin JavaScript. Se revisan imágenes, contactos y menú en tamaños de móvil y escritorio, junto con comprobaciones automáticas de accesibilidad.

La red de este entorno bloquea el acceso a `alvaro-web.pages.dev` (403 del proxy al establecer el túnel HTTPS). Esto impide confirmar aquí el despliegue público y sus cabeceras; no demuestra un fallo de Cloudflare ni un bloqueo para Google. Las pruebas usan los archivos locales mediante un servidor estático. La validación externa de Schema.org y las acciones en Search Console quedan como comprobaciones posteriores al despliegue.

## Mantenimiento

Si cambias de dominio, actualiza canonical, `og:url`, imágenes sociales, URLs e identificadores JSON-LD, sitemap y la referencia al sitemap en robots. No añadas páginas al sitemap hasta que existan realmente. Si cambias fotografías, actualiza su ruta, dimensiones y texto alternativo. Mantén los datos estructurados alineados con el contenido visible y la actividad real.
