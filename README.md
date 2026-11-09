# Álvaro Web

Web personal estática de Álvaro, desarrollador web en formación en Valdepeñas. HTML, CSS y JavaScript sin frameworks, dependencias de ejecución ni compilación. No incluye formularios, analítica, cookies de seguimiento ni fuentes externas.

## Archivos

- `index.html`: contenido, secciones y metadatos SEO.
- `css/estilos.css`: diseño responsive, ilustración original en CSS y movimiento reducido.
- `js/script.js`: configuración, menú móvil, navegación activa y año automático.
- `img/favicon.svg`: icono original; guarda aquí tus capturas reales.

## Abrir en VS Code y en el navegador

1. Descarga o clona este repositorio independiente.
2. En VS Code, usa **Archivo → Abrir carpeta** y selecciona `alvaro-web` (o ejecuta `code .` desde esa carpeta si tienes el comando instalado).
3. Abre `index.html` con doble clic desde el explorador de archivos. Funciona directamente con `file://`, sin XAMPP, servidor, Node ni Python.
4. Opcionalmente, utiliza la extensión Live Server de VS Code para recargar al guardar.

## Configurar contacto y proyecto

Edita el bloque `CONFIG` al principio de `js/script.js`:

| Campo              | Qué añadir                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `whatsapp`         | Tu número internacional real, con prefijo de país y solo dígitos, sin `+`, espacios ni guiones. |
| `email`            | Tu dirección de correo real.                                                                    |
| `instagram`        | La URL HTTPS completa de tu perfil de Instagram.                                                |
| `gymForceUrl`      | El enlace HTTPS real de la demostración Gym Force.                                              |
| `gymForceImage`    | Ruta relativa a la captura real, por ejemplo `img/gym-force.webp`.                              |
| `gymForceImageAlt` | Descripción breve y fiel de esa captura para lectores de pantalla.                              |

Los campos empiezan vacíos: no hay datos personales inventados. Los enlaces se activan al configurar valores válidos; los contactos configurados aparecen también en el pie. Si algún enlace sigue inactivo, revisa el formato y guarda los cambios. Los avisos desaparecen al completar los datos correspondientes. El correo abre la aplicación de correo del visitante; no envía mensajes automáticamente.

### Captura de Gym Force

Exporta una captura real en WebP o AVIF (preferiblemente de hasta 1200 píxeles de ancho y menos de 200 KB), guárdala en `img/` y rellena los dos campos de imagen. También se admiten PNG y JPG. Si la ruta falla o falta el texto alternativo, se conserva el espacio provisional. No se han utilizado archivos del proyecto Gym Force ni de Aylin Shop.

### Añadir proyectos

Duplica el elemento `<article class="project-card">` de la sección `#proyectos` en `index.html`, dejando espacio entre tarjetas si lo necesitas. Usa identificadores únicos o retíralos en las nuevas tarjetas. Para un proyecto con datos completos puedes poner directamente una imagen con `alt`, `loading="lazy"`, `width` y `height`, y un enlace real en `href`; retira `aria-disabled`, `role="link"` y el aviso provisional de esa nueva tarjeta. No dupliques los identificadores `gym-preview`, `gym-link` o `gym-pending`, que están reservados a la configuración de Gym Force.

## Comprobación manual

- Prueba anchos de 320, 390, 768 y 1440 píxeles: no debería aparecer desplazamiento horizontal.
- En móvil, abre el menú y elige una sección; debe cerrarse. Escape lo cierra y devuelve el foco al botón.
- Navega con Tab: el primer enlace permite saltar al contenido; los elementos interactivos tienen foco visible.
- Activa movimiento reducido en el sistema: se eliminan animaciones y desplazamientos suaves.
- Sin JavaScript, el contenido y la navegación siguen disponibles; los contactos requieren JavaScript para leer `CONFIG`.
- Tras configurar datos, comprueba tus enlaces reales antes de compartir la web.

## Cloudflare Pages (publicación posterior)

La web está preparada para alojamiento estático. Cuando decidas publicarla desde este repositorio, selecciona el preset **None**, deja sin comando de compilación y usa la raíz del proyecto como directorio de salida (`.`). No necesitas XAMPP ni servicios de pago. Este trabajo no configura ni publica Cloudflare Pages.

Antes de publicar: completa tus contactos, la captura y el enlace del proyecto; revisa los textos y si corresponde añadir información legal según la actividad y los datos que finalmente publiques. Cuando exista una URL definitiva, podrás añadir una etiqueta canonical y `og:url` en `index.html`. No se han inventado esas URLs.

## Validación realizada

Comprobada con Chromium y Playwright a 320, 360, 390, 768, 1024 y 1440 píxeles: sin desbordamiento horizontal, destinos internos válidos, menú móvil funcional, cierre con Escape y recuperación de foco, año automático y movimiento reducido. Probadas las ramas de configuración con datos ficticios solo en memoria: activación de contactos, enlaces del pie, enlace del proyecto, carga de captura y conservación del aviso si la imagen falla. Contenido y navegación comprobados sin JavaScript; sin errores JavaScript en estas pruebas.

axe-core no detectó infracciones en las reglas WCAG 2 A/AA y 2.1 AA ejecutadas a 390 y 1440 píxeles. Esta comprobación automática no sustituye una auditoría manual completa.

Las pruebas se sirvieron con un servidor estático temporal de Node externo al proyecto. La política del Chromium de este entorno bloquea URLs `file://`, por lo que la apertura directa por doble clic no se pudo ejecutar aquí. La web usa rutas relativas, un script clásico y ningún `fetch` o módulo que requiera servidor.
