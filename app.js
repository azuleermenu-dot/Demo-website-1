const body = document.body;
const styleLab = document.getElementById('styleLab');
const openStyleLab = document.getElementById('openStyleLab');
const closeStyleLab = document.getElementById('closeStyleLab');
const styleBackdrop = document.getElementById('styleBackdrop');
const heroStyleButton = document.getElementById('heroStyleButton');
const showcaseStyleButton = document.getElementById('showcaseStyleButton');
const toast = document.getElementById('toast');
const radiusRange = document.getElementById('radiusRange');
const radiusLabel = document.getElementById('radiusLabel');
const motionToggle = document.getElementById('motionToggle');
const resetStyles = document.getElementById('resetStyles');
const layoutLabel = document.getElementById('layoutLabel');
const defaultSettings = { theme: 'saffron', layout: 'split', radius: 18, motion: 'on' };
const appetiteStyles = [
  { id: 'saffron', name: 'Saffron Table', description: 'Golden warmth, tomato accents and generous food photography.' },
  { id: 'bistro', name: 'Modern Bistro', description: 'A cozy neighborhood feel with rich reds and soft paper tones.' },
  { id: 'garden', name: 'Garden Fresh', description: 'Fresh greens and natural textures for healthy, vibrant menus.' },
  { id: 'noir', name: 'Dinner Noir', description: 'A dramatic evening mood for upscale dining experiences.' },
  { id: 'dessert', name: 'Dessert Social', description: 'Soft berry colors and sweet visual energy for cafés and dessert shops.' },
  { id: 'street', name: 'Street Kitchen', description: 'Bold contrast and spicy accents for casual food concepts.' }
];

function injectAppetiteStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .style-helper{margin:-4px 0 14px;color:var(--muted);font-size:.76rem;line-height:1.5}
    .appetite-option{min-height:92px;transition:transform .2s ease,border-color .2s ease,background .2s ease}
    .appetite-option:hover{transform:translateY(-3px)}
    .saffron-swatch{background:linear-gradient(135deg,#f4b942 0 45%,#d94b2b 45% 72%,#fff1cf 72%)}
    .bistro-swatch{background:linear-gradient(135deg,#f3e5cf 0 48%,#a93628 48% 75%,#34221d 75%)}
    .garden-swatch{background:linear-gradient(135deg,#b8d58b 0 45%,#386641 45% 75%,#f5e9c9 75%)}
    .noir-swatch{background:linear-gradient(135deg,#242124 0 48%,#c58b4e 48% 75%,#eee2cf 75%)}
    .dessert-swatch{background:linear-gradient(135deg,#f6c7d8 0 48%,#9d416d 48% 75%,#fff0e6 75%)}
    .street-swatch{background:linear-gradient(135deg,#242322 0 48%,#e4572e 48% 75%,#f4c95d 75%)}
    body[data-theme="saffron"]{--bg:#21150e;--surface:#2d1c12;--surface-2:#402719;--text:#fff7e8;--muted:#cbb49b;--line:rgba(255,239,204,.16);--accent:#f4b942;--accent-2:#d94b2b;--accent-ink:#241307;--shadow:0 24px 80px rgba(73,31,9,.3)}
    body[data-theme="bistro"]{--bg:#f3e5cf;--surface:#fff8ec;--surface-2:#e8d2b7;--text:#34221d;--muted:#806b5c;--line:rgba(52,34,29,.15);--accent:#a93628;--accent-2:#d67b43;--accent-ink:#fff8ed;--shadow:0 24px 80px rgba(94,53,25,.12)}
    body[data-theme="garden"]{--bg:#102018;--surface:#172b20;--surface-2:#213a2a;--text:#f5f4df;--muted:#b8c4a9;--line:rgba(232,247,208,.14);--accent:#b8d58b;--accent-2:#e0a458;--accent-ink:#172216}
    body[data-theme="noir"]{--bg:#111013;--surface:#1b191c;--surface-2:#29242a;--text:#fff7eb;--muted:#b9aead;--line:rgba(255,241,218,.14);--accent:#c58b4e;--accent-2:#e2b778;--accent-ink:#1b120c}
    body[data-theme="dessert"]{--bg:#281722;--surface:#3a2030;--surface-2:#512d42;--text:#fff2f0;--muted:#d9b9c3;--line:rgba(255,226,237,.15);--accent:#f6c7d8;--accent-2:#e68ab0;--accent-ink:#3a1727}
    body[data-theme="street"]{--bg:#171717;--surface:#242424;--surface-2:#303030;--text:#fff7e5;--muted:#c2b8a4;--line:rgba(255,240,205,.15);--accent:#f4c95d;--accent-2:#e4572e;--accent-ink:#21170a}
    body[data-theme="saffron"] .hero-card img,body[data-theme="bistro"] .hero-card img,body[data-theme="street"] .hero-card img{filter:saturate(1.15) contrast(1.06)}
    body[data-theme="saffron"] .dish-image img,body[data-theme="bistro"] .dish-image img,body[data-theme="dessert"] .dish-image img{filter:saturate(1.12) contrast(1.04)}
    [hidden]{display:none!important}
    @media(max-width:700px){.appetite-option{min-height:82px}.style-helper{font-size:.7rem}}
  `;
  document.head.appendChild(style);
}

if (styleLab) {
  styleLab.setAttribute('aria-hidden', 'true');
  styleLab.setAttribute('hidden', '');
}
function loadSettings() { try { return { ...defaultSettings, ...(JSON.parse(localStorage.getItem('plate01-style')) || {}) }; } catch { return { ...defaultSettings }; } }
let settings = loadSettings();
function saveSettings() { localStorage.setItem('plate01-style', JSON.stringify(settings)); }
function applySettings() {
  body.dataset.theme = settings.theme; body.dataset.layout = settings.layout; body.dataset.motion = settings.motion; body.style.setProperty('--radius', `${settings.radius}px`);
  if (radiusRange) radiusRange.value = settings.radius;
  if (radiusLabel) radiusLabel.textContent = `${settings.radius}px`;
  if (motionToggle) { motionToggle.classList.toggle('active', settings.motion === 'on'); motionToggle.setAttribute('aria-pressed', String(settings.motion === 'on')); }
  if (layoutLabel) layoutLabel.textContent = ({ split:'Split', center:'Centered', editorial:'Editorial' })[settings.layout] || 'Split';
  document.querySelectorAll('[data-theme-choice]').forEach((button) => button.classList.toggle('active', button.dataset.themeChoice === settings.theme));
  document.querySelectorAll('[data-layout]').forEach((button) => button.classList.toggle('active', button.dataset.layout === settings.layout));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(body).getPropertyValue('--bg').trim() || '#111111');
}
function showToast(message) { if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600); }
function openLab() { if (!styleLab) return; styleLab.removeAttribute('hidden'); styleLab.classList.add('open'); styleLab.setAttribute('aria-hidden', 'false'); closeStyleLab?.focus(); body.classList.add('lab-open'); }
function closeLab() { if (!styleLab) return; styleLab.classList.remove('open'); styleLab.setAttribute('aria-hidden', 'true'); styleLab.setAttribute('hidden', ''); openStyleLab?.focus(); body.classList.remove('lab-open'); }
openStyleLab?.addEventListener('click', openLab); heroStyleButton?.addEventListener('click', openLab); showcaseStyleButton?.addEventListener('click', openLab); closeStyleLab?.addEventListener('click', closeLab); styleBackdrop?.addEventListener('click', closeLab);
window.addEventListener('keydown', (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); styleLab?.hasAttribute('hidden') ? openLab() : closeLab(); } if (event.key === 'Escape' && styleLab && !styleLab.hasAttribute('hidden')) closeLab(); });
document.addEventListener('click', (event) => { const button = event.target.closest('[data-theme-choice]'); if (!button) return; settings.theme = button.dataset.themeChoice; applySettings(); saveSettings(); const selected = appetiteStyles.find((item) => item.id === settings.theme); showToast(`${selected?.name || 'Style'} applied — ${selected?.description || 'live preview updated'}`); });
document.querySelectorAll('[data-layout]').forEach((button) => button.addEventListener('click', () => { settings.layout = button.dataset.layout; applySettings(); saveSettings(); showToast(`${button.textContent.trim()} hero layout applied`); }));
radiusRange?.addEventListener('input', () => { settings.radius = Number(radiusRange.value); applySettings(); saveSettings(); });
motionToggle?.addEventListener('click', () => { settings.motion = settings.motion === 'on' ? 'off' : 'on'; applySettings(); saveSettings(); showToast(settings.motion === 'on' ? 'Motion enabled' : 'Motion reduced'); });
resetStyles?.addEventListener('click', () => { settings = { ...defaultSettings }; applySettings(); saveSettings(); showToast('Appetite-first default restored'); });
const filters = [...document.querySelectorAll('.filter')]; const dishes = [...document.querySelectorAll('.dish-card')];
filters.forEach((filter) => filter.addEventListener('click', () => { filters.forEach((item) => item.classList.remove('active')); filter.classList.add('active'); dishes.forEach((dish) => dish.classList.toggle('hidden', filter.dataset.filter !== 'all' && dish.dataset.category !== filter.dataset.filter)); }));
const reservationForm = document.getElementById('reservationForm'); const dateField = document.getElementById('dateField');
if (dateField) { const now = new Date(); dateField.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
reservationForm?.addEventListener('submit', (event) => { event.preventDefault(); showToast('Reservation preview ready — no booking was created.'); });
const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); } }), { threshold: 0.12 }); revealItems.forEach((item) => observer.observe(item)); } else revealItems.forEach((item) => item.classList.add('in-view'));
if (window.matchMedia('(pointer:fine)').matches) { let raf = null; window.addEventListener('pointermove', (event) => { if (raf) return; raf = requestAnimationFrame(() => { document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`); document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`); raf = null; }); }); }
injectAppetiteStyles(); applySettings();

// Permanently remove the broken Style Lab markup from the live page.
styleLab?.remove();
