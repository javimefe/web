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
    const openText = button.dataset.openText || 'Mostrar información';
    const closeText = button.dataset.closeText || 'Ocultar explicación';
    button.textContent = isOpen ? closeText : openText;
  });
}

// Carrusel simple para cada bloque de imágenes
for (const carousel of document.querySelectorAll('[data-carousel]')) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let index = 0;
  let autoPlay = null;

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

  const startAutoPlay = () => {
    autoPlay = window.setInterval(() => {
      index = (index + 1) % slides.length;
      render();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlay) window.clearInterval(autoPlay);
  };

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  startAutoPlay();
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

// Barra de progreso de scroll
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = fullHeight > 0 ? (scrollTop / fullHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  });
}

// Contadores animados
const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = window.setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = String(target);
      window.clearInterval(timer);
      return;
    }
    element.textContent = String(current);
  }, 35);
};

// Animaciones suaves al hacer scroll (IntersectionObserver)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stat-number') && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelectorAll('.stat-number').forEach((element) => observer.observe(element));
