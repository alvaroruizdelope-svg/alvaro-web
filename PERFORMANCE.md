# Rendimiento móvil de AV CODE STUDIO

## Cambios

Se conservan el diseño, el texto, las proporciones, el encuadre de la fotografía, todos los enlaces y los metadatos SEO. Los PNG originales permanecen en `img/` como originales y para no romper las URLs existentes de Open Graph y JSON-LD; las fotografías visibles en la página usan WebP.

Conversión con Sharp 0.35.5: WebP con calidad 86 y esfuerzo 6; redimensionado por anchura sin ampliar los originales. No se recortan ni se regeneran las fotografías.

| Archivo servido              | Dimensiones | Peso         |
| ---------------------------- | ----------- | ------------ |
| `img/gym-force-640.webp`     | 640 × 336   | 29.174 bytes |
| `img/gym-force.webp`         | 1440 × 755  | 79.036 bytes |
| `img/alvaro-perfil-560.webp` | 560 × 700   | 25.704 bytes |
| `img/alvaro-perfil.webp`     | 1122 × 1402 | 75.772 bytes |

Antes, Gym Force pesaba 1.875.425 bytes y el retrato 1.927.612 bytes: 3.803.037 bytes en conjunto. Las variantes grandes suman 154.808 bytes (95,9 % menos); las pequeñas, 54.878 bytes (98,6 % menos). El navegador selecciona cada variante según el espacio indicado en `sizes` y la densidad de pantalla. Se mantienen textos alternativos, dimensiones, carga diferida y decodificación asíncrona. Las imágenes están debajo de la portada; no se precargan porque competirían innecesariamente con el contenido inicial.

`CONFIG.gymForceImage` apunta a `img/gym-force.webp`. Si se configura otra imagen, el script retira las variantes anteriores para evitar que `srcset` siga mostrando la captura antigua. Al sustituir las imágenes en el futuro, actualiza las variantes, sus anchuras en `srcset` y el valor de respaldo en `src`.

## Título y estabilidad de la portada

Lighthouse identifica el H1 como elemento LCP. Antes, `.hero-copy` tenía una animación de 650 ms desde `opacity: 0`, que afectaba también al título. Se elimina esa animación del texto: el título se pinta desde el primer renderizado. Se conserva la animación de la ilustración y las transiciones existentes, así como el respeto al movimiento reducido.

Al hacer visible el texto inmediatamente, una prueba intermedia reveló CLS de 0,117: la navegación móvil aparecía inicialmente desplegada y luego el script diferido añadía la clase `js`, cambiando la altura de la cabecera. La clase se añade ahora mediante una instrucción mínima en la cabecera del HTML, antes de cargar el CSS. Así el primer renderizado ya utiliza el espacio correcto y el script diferido sigue gestionando el menú. Con JavaScript desactivado se conserva la navegación visible. La prueba final registra CLS 0.

El CSS ocupa aproximadamente 22 KB sin comprimir, usa fuentes del sistema y se sirve mediante una sola hoja. Lighthouse local estima unos 150 ms potenciales por bloqueo del CSS. Se conserva su carga normal: dividir estilos críticos, duplicarlos en el HTML o cargarlos asíncronamente introduciría mantenimiento y riesgo de parpadeos para un ahorro pequeño. No se añaden fuentes, paquetes ni herramientas al funcionamiento de la web.

## Mediciones y límites

Lighthouse 13.6.0 en Chromium, perfil móvil predeterminado con simulación de red/CPU, servidor estático local y cargas separadas antes/después. Versión anterior: `d503a3e`. Los números son muestras de laboratorio, no resultados nuevos de PageSpeed Insights en Cloudflare.

| Métrica local                                                  | Antes  | Después |
| -------------------------------------------------------------- | ------ | ------- |
| FCP                                                            | 0,91 s | 0,91 s  |
| LCP                                                            | 1,28 s | 0,91 s  |
| Retardo de renderizado del elemento LCP (desglose de la traza) | 750 ms | 85 ms   |
| TBT                                                            | 24 ms  | 0 ms    |
| CLS                                                            | 0      | 0       |
| Puntuación de rendimiento                                      | 100    | 100     |

El LCP simulado y el desglose temporal de la traza usan metodologías diferentes; no deben sumarse directamente. La prueba local ya daba 100 antes, por lo que no reproduce el 78/100 ni los 5,5 s de LCP del informe público. La retirada del fundido reduce una demora identificable; no demuestra que toda la demora de producción proceda de esa animación. Las imágenes más ligeras reducen especialmente las transferencias al desplazarse por proyectos y presentación.

El proxy del entorno bloquea `https://alvaro-web.pages.dev/` con 403 al establecer el túnel HTTPS, de modo que no se pudo medir aquí la versión pública ni comprobar su despliegue.

## Verificación

- Pruebas con Playwright a 320, 390, 768, 1024 y 1440 px; también a 390 y 1440 px con densidad 2.
- Comparación de dimensiones con la versión anterior: las tarjetas, la cabecera, el título y las fotografías conservan su tamaño (tolerancia inferior a 1 px por redondeo de imagen). Inspección visual de las conversiones y del resultado en móvil.
- Comprobada la selección de variantes WebP, su decodificación, la carga diferida, el menú móvil y la carga sin JavaScript. Comprobada también la configuración de una captura alternativa.
- Sin errores de JavaScript, HTML válido en el validador utilizado y sin infracciones en las reglas WCAG A/AA ejecutadas por axe-core a 390 y 1440 px.
- Comprobados sin cambios los enlaces, textos, textos alternativos, título SEO, metas, canonical y JSON-LD. `robots.txt`, `sitemap.xml`, el archivo de verificación de Google y los PNG originales coinciden byte a byte con la versión anterior.

Tras el despliegue de Cloudflare Pages, ejecuta varias pruebas móviles de PageSpeed Insights sobre `https://alvaro-web.pages.dev/` y compara la mediana en condiciones similares. Revisa el elemento LCP y su desglose, CLS y la selección de imágenes en la pestaña Red. Las vistas previas de imágenes y los recursos pueden estar en caché; realiza una carga con caché desactivada al verificar los nuevos archivos. No se garantiza una puntuación concreta.
