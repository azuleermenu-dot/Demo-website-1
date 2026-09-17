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
const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
const layoutButtons = [...document.querySelectorAll('[data-layout]')];

const defaultSettings = { theme: 'saffron', layout: 'split', radius: 18, motion: 'on' };

const appetiteStyles = [
  { id: 'saffron', name: 'Saffron Table', note: 'Warm · appetite-first', description: 'Golden warmth, tomato accents and generous food photography.' },
  { id: 'bistro', name: 'Modern Bistro', note: 'Cream · tomato', description: 'A cozy neighborhood feel with rich reds and soft paper tones.' },
  { id: 'garden', name: 'Garden Fresh', note: 'Herb · organic', description: 'Fresh greens and natural textures for healthy, vibrant menus.' },
  { id: 'noir', name: 'Dinner Noir', note: 'Dark · premium', description: 'A dramatic evening mood for upscale dining experiences.' },
  { id: 'dessert', name: 'Dessert Social', note: 'Berry · playful', description: 'Soft berry colors and sweet visual energy for cafés and dessert shops.' },
  { id: 'street', name: 'Street Kitchen', note: 'Charcoal · chili', description: 'Bold contrast and spicy accents for casual food concepts.' }
];

// Keep the Style Lab hidden until the visitor opens it.
styleLab.classList.remove('open');
styleLab.setAttribute('aria-hidden', 'true');
styleLab.style.display = 'none';

function loadSettings() {
  try { return { ...defaultSettings, ...(JSON.parse(localStorage.getItem('plate01-style')) || {}) }; }
  catch { return { ...defaultSettings }; }
}
let settings = loadSettings();

function injectAppetitePreferences() {
  const themeGrid = document.querySelector('.theme-grid');
  if (!themeGrid || document.getElementById('appetitePreferences')) return;
  themeGrid.id = 'appetitePreferences';
  themeGrid.innerHTML = appetiteStyles.map((style) => `
    <button class="theme-option appetite-option" data-theme-choice="${style.id}" type="button">
      <span class="swatch ${style.id}-swatch"></span><b>${style.name}</b><small>${style.note}</small>
    </button>`).join('');
  themeGrid.insertAdjacentHTML('beforebegin', '<p class="style-helper">Choose a food mood that makes the menu feel more inviting.</p>');
}

function saveSettings() { localStorage.setItem('plate01-style', JSON.stringify(settings)); }

function applySettings() {
  body.dataset.theme = settings.theme;
  body.dataset.layout = settings.layout;
  body.dataset.motion = settings.motion;
  body.style.setProperty('--radius', `${settings.radius}px`);
  radiusRange.value = settings.radius;
  radiusLabel.textContent = `${settings.radius}px`;
  motionToggle.classList.toggle('active', settings.motion === 'on');
  motionToggle.setAttribute('aria-pressed', String(settings.motion === 'on'));
  const layoutNames = { split: 'Split', center: 'Centered', editorial: 'Editorial' };
  layoutLabel.textContent = layoutNames[settings.layout] || 'Split';
  document.querySelectorAll('[data-theme-choice]').forEach((button) => button.classList.toggle('active', button.dataset.themeChoice === settings.theme));
  document.querySelectorAll('[data-layout]').forEach((button) => button.classList.toggle('active', button.dataset.layout === settings.layout));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(body).getPropertyValue('--bg').trim() || '#111111');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function openLab() { styleLab.style.display = 'block'; styleLab.classList.add('open'); styleLab.setAttribute('aria-hidden', 'false'); closeStyleLab.focus(); body.classList.add('lab-open'); }
function closeLab() { styleLab.classList.remove('open'); styleLab.setAttribute('aria-hidden', 'true'); styleLab.style.display = 'none'; openStyleLab.focus(); body.classList.remove('lab-open'); }

openStyleLab.addEventListener('click', openLab);
heroStyleButton.addEventListener('click', openLab);
showcaseStyleButton.addEventListener('click', openLab);
closeStyleLab.addEventListener('click', closeLab);
styleBackdrop.addEventListener('click', closeLab);
window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); styleLab.classList.contains('open') ? closeLab() : openLab(); }
  if (event.key === 'Escape' && styleLab.classList.contains('open')) closeLab();
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-theme-choice]');
  if (!button) return;
  settings.theme = button.dataset.themeChoice;
  applySettings(); saveSettings();
  const selected = appetiteStyles.find((item) => item.id === settings.theme);
  showToast(`${selected?.name || 'Style'} applied — ${selected?.description || 'live preview updated'}`);
});

document.querySelectorAll('[data-layout]').forEach((button) => button.addEventListener('click', () => {
  settings.layout = button.dataset.layout; applySettings(); saveSettings(); showToast(`${button.textContent.trim()} hero layout applied`);
}));
radiusRange.addEventListener('input', () => { settings.radius = Number(radiusRange.value); applySettings(); saveSettings(); });
motionToggle.addEventListener('click', () => { settings.motion = settings.motion === 'on' ? 'off' : 'on'; applySettings(); saveSettings(); showToast(settings.motion === 'on' ? 'Motion enabled' : 'Motion reduced'); });
resetStyles.addEventListener('click', () => { settings = { ...defaultSettings }; applySettings(); saveSettings(); showToast('Appetite-first default restored'); });

const filters = [...document.querySelectorAll('.filter')];
const dishes = [...document.querySelectorAll('.dish-card')];
filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('active')); filter.classList.add('active');
  dishes.forEach((dish) => dish.classList.toggle('hidden', filter.dataset.filter !== 'all' && dish.dataset.category !== filter.dataset.filter));
}));

const reservationForm = document.getElementById('reservationForm');
const dateField = document.getElementById('dateField');
if (dateField) { const now = new Date(); dateField.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
reservationForm.addEventListener('submit', (event) => { event.preventDefault(); showToast('Reservation preview ready — no booking was created.'); });

const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); } }), { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('in-view'));

if (window.matchMedia('(pointer:fine)').matches) {
  let raf = null;
  window.addEventListener('pointermove', (event) => { if (raf) return; raf = requestAnimationFrame(() => { document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`); document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`); raf = null; }); });
}

injectAppetitePreferences();
applySettings();
