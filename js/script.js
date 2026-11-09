'use strict';

// CONFIGURACIÓN: contactos reales y datos del proyecto pendientes de completar.
const CONFIG = {
  whatsapp: '34722892707', // Número internacional, solo dígitos (prefijo de país incluido).
  email: 'alvaro.ruizdelope@gmail.com', // Dirección de correo real.
  whatsappMessage:
    '¡Hola, Álvaro! He visto tu página web y me gustaría pedirte información sobre la creación de una web para mi negocio', // Texto editable antes de enviar en WhatsApp.
  gymForceUrl: 'https://alvaroruizdelope-svg.github.io/gymforce/', // URL pública real del proyecto; debe empezar por https://.
  gymForceImage: 'img/gym-force.png', // Sube la captura real a esta ruta.
  gymForceImageAlt:
    'Captura de la portada de Gym Force, con el lema Supera tus límites y una persona entrenando con una barra.',
};

document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacion');
menuButton.hidden = false;
const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('.menu-label').textContent = open
    ? 'Cerrar menú'
    : 'Abrir menú';
  navigation.classList.toggle('is-open', open);
};
menuButton.addEventListener('click', () =>
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true'),
);
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    menuButton.getAttribute('aria-expanded') === 'true'
  ) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) setMenu(false);
});
navigation.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (!document.activeElement.closest('.header')) setMenu(false);
  });
});
matchMedia('(min-width: 901px)').addEventListener('change', () =>
  setMenu(false),
);
document.querySelector('#year').textContent = new Date().getFullYear();

function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : '';
  } catch {
    return '';
  }
}
const phone = CONFIG.whatsapp.trim();
const email = CONFIG.email.trim();
const contacts = {
  whatsapp: /^\d{7,15}$/.test(phone)
    ? `https://wa.me/${phone}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`
    : '',
  email: /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)
    ? `mailto:${email}`
    : '',
};
Object.entries(contacts).forEach(([type, url]) => {
  document.querySelectorAll(`[data-contact="${type}"]`).forEach((link) => {
    if (!url) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      return;
    }
    link.href = url;
    link.removeAttribute('aria-disabled');
    if (link.closest('#footer-contacts') && type === 'email')
      link.textContent = email;
  });
});

const projectUrl = httpsUrl(CONFIG.gymForceUrl);
if (projectUrl) {
  const link = document.querySelector('#gym-link');
  link.href = projectUrl;
  link.removeAttribute('aria-disabled');
  link.removeAttribute('role');
  link.hidden = false;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
}
// Solo imágenes locales de img/. Si fallan, se conserva el aviso provisional.
if (
  /^img\/[a-zA-Z0-9_./-]+\.(webp|avif|png|jpe?g)$/i.test(
    CONFIG.gymForceImage,
  ) &&
  !CONFIG.gymForceImage.includes('..') &&
  CONFIG.gymForceImageAlt.trim()
) {
  const image = new Image();
  image.alt = CONFIG.gymForceImageAlt;
  // Carga la imagen antes de sustituir el espacio provisional.
  image.loading = 'eager';
  image.decoding = 'async';
  image.addEventListener('load', () =>
    document.querySelector('#gym-preview').replaceChildren(image),
  );
  image.src = CONFIG.gymForceImage;
}
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
  );
  document
    .querySelectorAll('main section[id]')
    .forEach((section) => observer.observe(section));
}
