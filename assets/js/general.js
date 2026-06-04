/* Theme toggle */
const themeToggles = document.querySelectorAll('.theme-toggle, .theme-menu-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeRoot = document.documentElement;

function applyTheme(isDark) {
  themeRoot.classList.toggle('theme-dark', isDark);
  themeToggles.forEach(toggle => {
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  });
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#05080d' : '#f5f5f5');
  }
}

applyTheme(themeRoot.classList.contains('theme-dark'));

themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isDark = !themeRoot.classList.contains('theme-dark');
    try {
      localStorage.setItem('nexora-theme', isDark ? 'dark' : 'light');
    } catch (error) {}
    applyTheme(isDark);
    closeMenu();
  });
});

gsap.registerPlugin(ScrollTrigger);

/* ── NAV scroll ── */
const nav = document.getElementById('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

function closeMenu() {
  nav.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Abrir menú');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HERO ── */
const heroTl = gsap.timeline({ delay: .2 });
heroTl
  .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' })
  .to('.hero-title .line span', {
    y: 0, duration: 1, stagger: .12, ease: 'power4.out'
  }, '-=.4')
  .to('.hero-sub', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.4')
  .to('.hero-actions', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.4');

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  gsap.to({ val: 0 }, {
    val: target, duration: 1.6, ease: 'power2.out',
    onUpdate: function() { el.textContent = Math.round(this.targets()[0].val); }
  });
}

/* ── SCROLL REVEALS ── */
document.querySelectorAll('.reveal').forEach(el => {
  ScrollTrigger.create({
    trigger: el, start: 'top 88%',
    onEnter: () => {
      gsap.to(el, { opacity: 1, y: 0, duration: .8, ease: 'power3.out' });
      if (el.querySelector('[data-count]')) {
        el.querySelectorAll('[data-count]').forEach(animateCounter);
      }
      if (el.dataset.count) animateCounter(el);
    }
  });
});
document.querySelectorAll('.reveal-left').forEach(el => {
  ScrollTrigger.create({
    trigger: el, start: 'top 88%',
    onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
  });
});
document.querySelectorAll('.reveal-right').forEach(el => {
  ScrollTrigger.create({
    trigger: el, start: 'top 88%',
    onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
  });
});

/* ── HERO PARALLAX ── */
gsap.to('.hero-grid-bg', {
  y: 50, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
});

/* ── SERVICE CARDS stagger ── */
ScrollTrigger.create({
  trigger: '.services-grid', start: 'top 80%',
  onEnter: () => {
    gsap.to('.service-card', {
      opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out',
      from: { opacity: 0, y: 30 }
    });
  }
});
gsap.set('.service-card', { opacity: 0, y: 30 });

/* ── PROCESS stagger ── */
ScrollTrigger.create({
  trigger: '.process-grid', start: 'top 80%',
  onEnter: () => {
    gsap.to('.process-step', {
      opacity: 1, y: 0, duration: .8, stagger: .15, ease: 'power3.out'
    });
  }
});
gsap.set('.process-step', { opacity: 0, y: 40 });

/* ── BACK TO TOP ── */
const footerTop = document.querySelector('.footer-top');
const footer = document.querySelector('footer');
if (footerTop && footer) {
  ScrollTrigger.create({
    trigger: footer,
    start: 'top bottom',
    onEnter: () => footerTop.classList.add('visible'),
    onLeaveBack: () => footerTop.classList.remove('visible')
  });
}
