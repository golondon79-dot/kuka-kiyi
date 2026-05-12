/* KuKa Kıyı Marina — script.js */

/* ── Language system ──────────────────────────────────── */
const translations = {
  tr: { dir: 'ltr', lang: 'tr' },
  en: { dir: 'ltr', lang: 'en' },
  ar: { dir: 'rtl', lang: 'ar' }
};

let currentLang = 'tr';

function applyLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;

  const { dir } = translations[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', dir);

  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('kuka-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* Restore saved language */
const savedLang = localStorage.getItem('kuka-lang');
if (savedLang && translations[savedLang]) applyLang(savedLang);


/* ── Navbar scroll ────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ── Mobile menu ──────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});


/* ── Menu tabs ────────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) {
      panel.classList.add('active');
      panel.style.opacity = '0';
      requestAnimationFrame(() => {
        panel.style.transition = 'opacity .25s ease';
        panel.style.opacity = '1';
      });
    }
  });
});


/* ── Smooth scroll for anchor links ──────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── Intersection observer — fade-in on scroll ────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.event-card, .menu-item, .shisha-card, .info-card, .wa-card, .stat'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

/* Add fade-up CSS dynamically so it doesn't need a separate block in CSS */
const style = document.createElement('style');
style.textContent = `
  .fade-up { opacity: 0; transform: translateY(22px); transition: opacity .5s ease, transform .5s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
