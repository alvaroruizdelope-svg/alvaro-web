# AV CODE STUDIO

Web estática de AV CODE STUDIO, la marca profesional de Álvaro, desarrollador web en formación en Valdepeñas. El repositorio sigue llamándose `alvaro-web`. El logotipo tipográfico en HTML y CSS utiliza «AV CODE» en verde lima y «STUDIO» debajo, con el lema en el pie; el favicon muestra las iniciales AV. HTML, CSS y JavaScript sin frameworks, dependencias de ejecución ni compilación. No incluye formularios, analítica, cookies de seguimiento ni fuentes externas.

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
| `whatsappMessage`  | Mensaje predefinido editable por el cliente antes de enviarlo.                                  |
| `gymForceUrl`      | El enlace HTTPS real de la demostración Gym Force.                                              |
| `gymForceImage`    | Ruta configurada: `img/gym-force.webp`, con variantes adaptables.                               |
| `gymForceImageAlt` | Descripción breve y fiel de esa captura para lectores de pantalla.                              |

WhatsApp está configurado con `34722892707` y un mensaje predefinido codificado mediante `encodeURIComponent`. WhatsApp muestra el mensaje como borrador: el visitante puede editarlo y decide si lo envía. El correo es `alvaro.ruizdelope@gmail.com`, mediante `mailto:`. Ambos contactos funcionan también sin JavaScript gracias a sus enlaces en `index.html`; si cambias los contactos en el futuro, actualiza también estos enlaces de respaldo en la sección de contacto y el pie.

`gymForceUrl` apunta a `https://alvaroruizdelope-svg.github.io/gymforce/`. El botón «Ver proyecto» abre una pestaña nueva con `target="_blank"` y `rel="noopener noreferrer"`; también funciona sin JavaScript. Si cambias la dirección, actualiza el enlace de respaldo en `index.html`.

### Captura de Gym Force

La ruta visible está configurada como `img/gym-force.webp`, con un texto alternativo que describe la captura facilitada en el chat. La captura real está incluida en el repositorio y se muestra en la sección de proyectos. La imagen está en el HTML con texto alternativo, dimensiones, carga diferida y altura automática, por lo que también se muestra sin JavaScript. Si cambias la captura, actualiza `CONFIG`, las rutas, las dimensiones y las variantes `srcset` de `index.html`. Los PNG originales se conservan. Consulta [PERFORMANCE.md](PERFORMANCE.md) para los tamaños y las mediciones de rendimiento. No se han modificado Gym Force ni Aylin Shop ni se han inventado imágenes.

### Añadir proyectos

Duplica el elemento `<article class="project-card">` de la sección `#proyectos` en `index.html`, dejando espacio entre tarjetas si lo necesitas. Usa identificadores únicos o retíralos en las nuevas tarjetas. Para un proyecto con datos completos puedes poner directamente una imagen con `alt`, `loading="lazy"`, `width` y `height`, y un enlace real en `href`; usa `target="_blank"` y `rel="noopener noreferrer"` para abrir el destino en una pestaña nueva. No dupliques los identificadores `gym-preview`, `gym-link`, que están reservados a la configuración de Gym Force.

## Comprobación manual

- Prueba anchos de 320, 390, 768 y 1440 píxeles: no debería aparecer desplazamiento horizontal.
- En móvil, abre el menú y elige una sección; debe cerrarse. Escape lo cierra y devuelve el foco al botón.
- Navega con Tab: el primer enlace permite saltar al contenido; los elementos interactivos tienen foco visible.
- Activa movimiento reducido en el sistema: se eliminan animaciones y desplazamientos suaves.
- Sin JavaScript, el contenido, la navegación y los contactos reales siguen disponibles.
- Tras configurar datos, comprueba tus enlaces reales antes de compartir la web.

## Cloudflare Pages

Dirección pública: https://alvaro-web.pages.dev/. Se sirve como web estática: preset **None**, sin comando de compilación y con la raíz del proyecto como directorio de salida (`.`). No necesitas XAMPP ni servicios de pago. Los cambios subidos a `main` pueden activar el despliegue automático si está conectado en Cloudflare Pages.

La canonical, los metadatos sociales y el sitemap utilizan la URL pública anterior. Consulta [SEO.md](SEO.md) para revisar el rastreo, enviar el sitemap a Google Search Console y mantener estos archivos. Conserva `google0bf7a7e5d25fad9f.html`, el archivo de verificación de Google.

## Validación realizada

Contactos verificados en Chromium a tamaños de móvil y ordenador: número de WhatsApp correcto, mensaje predefinido recuperado íntegro al decodificar la URL y correo mediante `mailto:` en contacto y pie. Comprobado que no quedan otros canales ni avisos de contacto pendiente, que el menú móvil funciona y que no hay desbordamiento horizontal entre 320 y 1440 píxeles.

El archivo real `img/gym-force.png` está incluido: comprobada su carga y presentación sin deformación en móvil y ordenador. Comprobado también que el botón de proyecto utiliza la dirección pública facilitada y abre una pestaña nueva de forma segura. El clic de «Ver proyecto» se comprobó interceptando la respuesta externa: abre la URL correcta en una pestaña nueva y `window.opener` es nulo. La disponibilidad real del sitio de Gym Force no se pudo comprobar porque la política de red del entorno bloquea su dominio (403 al establecer el túnel HTTPS). Estas pruebas no envían mensajes ni abren aplicaciones personales: la apertura final depende de que el visitante tenga acceso a WhatsApp o una aplicación de correo configurada.

Las pruebas usan un servidor estático temporal externo al proyecto. La política del Chromium de este entorno bloquea URLs `file://`; la web utiliza rutas relativas, un script clásico y ningún `fetch` o módulo que requiera servidor.
