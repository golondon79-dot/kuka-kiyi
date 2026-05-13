/* KuKa Kıyı Marina */

/* ── Language ────────────────────────────────────────────── */
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


/* ── Burger ──────────────────────────────────────────────── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.classList.toggle('open', open);
});
drawer.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.classList.remove('open');
  }));


/* ── Menu tabs ───────────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
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


/* ── Smooth scroll ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  });
});


/* ── Scroll fade-in ──────────────────────────────────────── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.ml-item,.ev-card,.sb-item,.ss-h,.stmt-big,.cs-row').forEach(el => {
  el.classList.add('fade-in');
  obs.observe(el);
});