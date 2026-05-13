/* KuKa Kıyı Marina */

/* Language */
const LANGS = { tr:{dir:'ltr'}, en:{dir:'ltr'}, ar:{dir:'rtl'} };

function applyLang(lang) {
  if (!LANGS[lang]) return;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', LANGS[lang].dir);
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const v = el.getAttribute('data-' + lang);
    if (!v) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = v;
    else el.innerHTML = v;
  });
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));
  localStorage.setItem('kuka-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(b =>
  b.addEventListener('click', () => applyLang(b.dataset.lang)));

const saved = localStorage.getItem('kuka-lang');
if (saved && LANGS[saved]) applyLang(saved);

/* Hamburger */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }));
}

/* Navbar scroll effect */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () =>
    navbar.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
}

/* Menu tabs */
document.querySelectorAll('.menu-tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    document.querySelectorAll('.menu-tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + id);
    if (panel) {
      panel.classList.add('active');
      panel.style.opacity = '0';
      requestAnimationFrame(() => { panel.style.transition = 'opacity .3s'; panel.style.opacity = '1'; });
    }
  });
});

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
});

/* Scroll fade-in */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.menu-item,.event-card,.stat,.gallery-item,.info-row').forEach(el => {
  el.classList.add('fade-in');
  obs.observe(el);
});