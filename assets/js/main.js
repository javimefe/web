// Menú responsive
const menuButton = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu');

if (menuButton && menuList) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuList.classList.toggle('open');
  });
}

// Botones para mostrar/ocultar contenido adicional
for (const button of document.querySelectorAll('.toggle-btn')) {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (!target) return;

    const isOpen = target.classList.toggle('open');
    button.textContent = isOpen ? 'Ocultar explicación' : 'Mostrar información';
  });
}

// Carrusel simple para cada bloque de imágenes
for (const carousel of document.querySelectorAll('[data-carousel]')) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let index = 0;

  const render = () => {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  };

  prev?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  next?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });
}

// Acordeón FAQ
for (const faqButton of document.querySelectorAll('.faq-question')) {
  faqButton.addEventListener('click', () => {
    const parent = faqButton.closest('.faq-item');
    if (!parent) return;

    const expanded = parent.classList.toggle('open');
    faqButton.setAttribute('aria-expanded', String(expanded));
  });
}

// Botón volver arriba
const toTopButton = document.querySelector('.to-top');
if (toTopButton) {
  window.addEventListener('scroll', () => {
    toTopButton.classList.toggle('show', window.scrollY > 260);
  });

  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Animaciones suaves al hacer scroll (IntersectionObserver)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
