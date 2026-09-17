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

const defaultSettings = {
  theme: 'midnight',
  layout: 'split',
  radius: 18,
  motion: 'on'
};

let settings = loadSettings();

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem('plate01-style'));
    return { ...defaultSettings, ...(stored || {}) };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem('plate01-style', JSON.stringify(settings));
}

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

  themeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.themeChoice === settings.theme);
  });

  layoutButtons.forEach((button) => {
    if (!button.dataset.layout) return;
    button.classList.toggle('active', button.dataset.layout === settings.layout);
  });

  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    getComputedStyle(body).getPropertyValue('--bg').trim() || '#111111'
  );
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function openLab() {
  styleLab.classList.add('open');
  styleLab.setAttribute('aria-hidden', 'false');
  closeStyleLab.focus();
  document.body.classList.add('lab-open');
}

function closeLab() {
  styleLab.classList.remove('open');
  styleLab.setAttribute('aria-hidden', 'true');
  openStyleLab.focus();
  document.body.classList.remove('lab-open');
}

openStyleLab.addEventListener('click', openLab);
heroStyleButton.addEventListener('click', openLab);
showcaseStyleButton.addEventListener('click', openLab);
closeStyleLab.addEventListener('click', closeLab);
styleBackdrop.addEventListener('click', closeLab);

window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    styleLab.classList.contains('open') ? closeLab() : openLab();
  }
  if (event.key === 'Escape' && styleLab.classList.contains('open')) closeLab();
});

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    settings.theme = button.dataset.themeChoice;
    applySettings();
    saveSettings();
    const name = button.querySelector('b')?.textContent || 'style';
    showToast(`${name} direction applied`);
  });
});

layoutButtons.forEach((button) => {
  if (!button.dataset.layout) return;
  button.addEventListener('click', () => {
    settings.layout = button.dataset.layout;
    applySettings();
    saveSettings();
    const name = button.textContent.trim();
    showToast(`${name} hero layout applied`);
  });
});

radiusRange.addEventListener('input', () => {
  settings.radius = Number(radiusRange.value);
  applySettings();
  saveSettings();
});

motionToggle.addEventListener('click', () => {
  settings.motion = settings.motion === 'on' ? 'off' : 'on';
  applySettings();
  saveSettings();
  showToast(settings.motion === 'on' ? 'Motion enabled' : 'Motion reduced');
});

resetStyles.addEventListener('click', () => {
  settings = { ...defaultSettings };
  applySettings();
  saveSettings();
  showToast('Demo style reset to defaults');
});

// Menu filtering
const filters = [...document.querySelectorAll('.filter')];
const dishes = [...document.querySelectorAll('.dish-card')];

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');

    const selected = filter.dataset.filter;
    dishes.forEach((dish) => {
      const matches = selected === 'all' || dish.dataset.category === selected;
      dish.classList.toggle('hidden', !matches);
    });
  });
});

// Visual-only reservation form.
const reservationForm = document.getElementById('reservationForm');
const dateField = document.getElementById('dateField');
if (dateField) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  dateField.min = `${yyyy}-${mm}-${dd}`;
}

reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Reservation preview ready — no booking was created.');
});

// Reveal animation with a graceful no-motion fallback.
const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

// Add a subtle cursor glow on desktop-sized screens.
if (window.matchMedia('(pointer:fine)').matches && settings.motion === 'on') {
  let raf = null;
  window.addEventListener('pointermove', (event) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      raf = null;
    });
  });
}

applySettings();
