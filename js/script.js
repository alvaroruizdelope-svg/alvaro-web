'use strict';

// CONFIGURACIÓN: sustituye solo los valores vacíos con tus datos reales.
const CONFIG = {
  whatsapp: '', // Número internacional, solo dígitos (prefijo de país incluido).
  email: '', // Dirección de correo real.
  instagram: '', // URL completa: https://www.instagram.com/tu_usuario/
  gymForceUrl: '', // URL pública real del proyecto; debe empezar por https://.
  gymForceImage: '', // Ruta local, por ejemplo: img/gym-force.webp
  gymForceImageAlt: '', // Describe la captura real al añadirla.
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

function httpsUrl(value, allowedHost) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      (!allowedHost ||
        url.hostname === allowedHost ||
        url.hostname === `www.${allowedHost}`)
      ? url.href
      : '';
  } catch {
    return '';
  }
}
const phone = CONFIG.whatsapp.trim();
const email = CONFIG.email.trim();
const contacts = {
  whatsapp: /^\d{7,15}$/.test(phone) ? `https://wa.me/${phone}` : '',
  email: /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)
    ? `mailto:${email}`
    : '',
  instagram: httpsUrl(CONFIG.instagram, 'instagram.com'),
};
const labels = {
  whatsapp: 'WhatsApp',
  email: 'Correo electrónico',
  instagram: 'Instagram',
};
const footerContacts = document.querySelector('#footer-contacts');
let configuredCount = 0;
Object.entries(contacts).forEach(([type, url]) => {
  if (!url) return;
  configuredCount++;
  document.querySelectorAll(`[data-contact="${type}"]`).forEach((link) => {
    link.href = url;
    link.removeAttribute('aria-disabled');
    link.removeAttribute('role');
  });
  const link = document.createElement('a');
  link.href = url;
  link.textContent = type === 'email' ? email : labels[type];
  footerContacts.append(link);
});
footerContacts.hidden = configuredCount === 0;
const pending = document.querySelector('#contact-pending');
if (configuredCount === 3) pending.hidden = true;
else if (configuredCount > 0)
  pending.textContent =
    'Más vías de contacto estarán disponibles próximamente.';

const projectUrl = httpsUrl(CONFIG.gymForceUrl);
if (projectUrl) {
  const link = document.querySelector('#gym-link');
  link.href = projectUrl;
  link.removeAttribute('aria-disabled');
  link.removeAttribute('role');
  document.querySelector('#gym-pending').hidden = true;
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
