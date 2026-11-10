'use strict';

// CONFIGURACIÓN: contactos reales y datos del proyecto.
const CONFIG = {
  whatsapp: '34722892707', // Número internacional, solo dígitos (prefijo de país incluido).
  email: 'alvaro.ruizdelope@gmail.com', // Dirección de correo real.
  whatsappMessage:
    '¡Hola, Álvaro! He visto tu página web y me gustaría pedirte información sobre la creación de una web para mi negocio', // Texto editable antes de enviar en WhatsApp.
  gymForceUrl: 'https://alvaroruizdelope-svg.github.io/gymforce/', // URL pública real del proyecto; debe empezar por https://.
  gymForceImage: 'img/gym-force.webp', // Captura real incluida en el repositorio.
  gymForceImageAlt:
    'Captura de la portada de Gym Force, proyecto de demostración de una web para un gimnasio',
};

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
// Conserva la imagen HTML y su carga diferida; permite configurar otra captura local.
const projectImage = document.querySelector('#gym-preview img');
if (
  projectImage &&
  /^img\/[a-zA-Z0-9_./-]+\.(webp|avif|png|jpe?g)$/i.test(
    CONFIG.gymForceImage,
  ) &&
  !CONFIG.gymForceImage.includes('..') &&
  CONFIG.gymForceImageAlt.trim()
) {
  projectImage.alt = CONFIG.gymForceImageAlt;
  if (projectImage.getAttribute('src') !== CONFIG.gymForceImage) {
    // Una captura personalizada no debe seguir usando las variantes anteriores.
    projectImage.removeAttribute('srcset');
    projectImage.removeAttribute('sizes');
    projectImage.src = CONFIG.gymForceImage;
  }
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
