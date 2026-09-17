const modal = document.querySelector('#reservationModal');
const openModalButtons = document.querySelectorAll('.reserve-trigger');
const closeModalButton = document.querySelector('.modal-close');
const form = document.querySelector('#reservationForm');
const success = document.querySelector('#formSuccess');
const toast = document.querySelector('#toast');

function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openModalButtons.forEach(button => button.addEventListener('click', openModal));
closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
form.addEventListener('submit', e => { e.preventDefault(); success.classList.add('show'); form.reset(); setTimeout(closeModal, 2200); });

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.dish-card[data-category]').forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category ? '' : 'none';
    });
  });
});

document.querySelectorAll('.heart').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '♥' : '♡';
    toast.textContent = button.classList.contains('liked') ? 'Added to your favorites.' : 'Removed from your favorites.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  });
});

document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const dish = button.closest('.dish-card').querySelector('h3').textContent;
    toast.textContent = `${dish} added to your order preview.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  });
});

document.querySelector('#searchBtn').addEventListener('click', () => {
  document.querySelector('#menu').scrollIntoView({behavior:'smooth'});
  setTimeout(() => document.querySelector('.filters').classList.add('pulse'), 300);
  setTimeout(() => document.querySelector('.filters').classList.remove('pulse'), 1200);
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('.desktop-nav');
  const visible = nav.style.display === 'flex';
  nav.style.display = visible ? '' : 'flex';
  nav.style.position = 'absolute'; nav.style.top = '65px'; nav.style.left = '0'; nav.style.right = '0'; nav.style.padding = '25px'; nav.style.background = '#182126'; nav.style.flexDirection = 'column'; nav.style.gap = '22px';
});

/* Style Lab — live visual customization panel */
const styleLabStyles = document.createElement('style');
styleLabStyles.textContent = `
.style-lab-trigger{position:fixed;right:24px;bottom:24px;z-index:80;border:1px solid #ffffff33;background:#182126;color:#fff;border-radius:30px;padding:13px 19px;display:flex;gap:9px;align-items:center;box-shadow:0 12px 35px #0005;cursor:pointer;font:600 12px var(--sans)}
.style-lab-trigger b{color:var(--gold);font-size:16px}.style-lab{position:fixed;right:24px;top:24px;width:355px;max-height:calc(100vh - 48px);overflow:auto;z-index:90;background:#11171b;color:#fff;border:1px solid #ffffff1c;border-radius:20px;padding:22px;box-shadow:0 25px 80px #0009;transform:translateX(430px);transition:transform .35s ease}.style-lab.open{transform:translateX(0)}.style-lab-head{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ffffff1c;padding-bottom:18px;margin-bottom:20px}.style-lab-head h3{margin:0;font:600 18px var(--serif)}.style-lab-head p{margin:5px 0 0;color:#9ca5aa;font-size:11px}.style-lab-close{background:none;border:0;color:#fff;font-size:25px;cursor:pointer}.lab-title{font-size:11px;font-weight:700;margin:18px 0 10px}.lab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.lab-option{border:1px solid #ffffff22;border-radius:10px;background:#20282d;color:#fff;padding:8px;cursor:pointer;text-align:left;font-size:10px}.lab-option.active{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold)}.lab-option span{display:block;height:45px;border-radius:6px;margin-bottom:7px;background:linear-gradient(135deg,#090b0d,#4b3524)}.lab-option.terracotta span{background:linear-gradient(135deg,#2b1712,#b46d45)}.lab-option.garden span{background:linear-gradient(135deg,#18271b,#739b62)}.lab-option.paper span{background:linear-gradient(135deg,#f7f1e8,#cfc6b6)}.lab-option.electric span{background:linear-gradient(135deg,#171b49,#a35bff)}.lab-option.aurora span{background:linear-gradient(135deg,#1b2436,#bd8a51,#563a75)}.lab-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 0}.lab-row label{font-size:11px;color:#d4d9dc}.lab-range{width:150px;accent-color:var(--gold)}.lab-switch{width:42px;height:23px;border-radius:20px;background:#384148;padding:3px;cursor:pointer}.lab-switch i{display:block;width:17px;height:17px;border-radius:50%;background:#fff;transition:.2s}.lab-switch.on{background:var(--gold)}.lab-switch.on i{transform:translateX(19px)}.lab-pills{display:flex;gap:8px}.lab-pill{flex:1;border:1px solid #ffffff22;background:#20282d;color:#ddd;border-radius:20px;padding:9px 5px;font-size:10px;cursor:pointer}.lab-pill.active{border-color:var(--gold);color:#fff}.lab-colors{display:flex;gap:12px}.lab-color{width:27px;height:27px;border-radius:50%;border:2px solid transparent;cursor:pointer}.lab-color.active{border-color:#fff;box-shadow:0 0 0 2px #777}.lab-reset{width:100%;margin-top:20px;background:transparent;border:1px solid #ffffff55;color:#fff;padding:11px;border-radius:20px;cursor:pointer;font-size:11px}.lab-backdrop{position:fixed;inset:0;background:#0007;z-index:85;display:none}.lab-backdrop.open{display:block}@media(max-width:650px){.style-lab{right:12px;top:12px;width:calc(100% - 24px);max-height:calc(100vh - 24px)}.style-lab-trigger{right:14px;bottom:14px}}
`;
document.head.appendChild(styleLabStyles);

const labBackdrop = document.createElement('div');
labBackdrop.className = 'lab-backdrop';
const lab = document.createElement('aside');
lab.className = 'style-lab';
lab.innerHTML = `<div class="style-lab-head"><div><h3>⚗ Style Lab</h3><p>Make it yours. Change the look, feel and vibe.</p></div><button class="style-lab-close">×</button></div><div class="lab-title">1. Choose a Design Style</div><div class="lab-grid"><button class="lab-option active" data-theme="midnight"><span></span>Midnight<small>Dark & Elegant</small></button><button class="lab-option terracotta" data-theme="terracotta"><span></span>Terracotta<small>Warm & Cozy</small></button><button class="lab-option garden" data-theme="garden"><span></span>Garden<small>Fresh & Natural</small></button><button class="lab-option paper" data-theme="paper"><span></span>Paper<small>Clean & Minimal</small></button><button class="lab-option electric" data-theme="electric"><span></span>Electric<small>Bold & Modern</small></button><button class="lab-option aurora" data-theme="aurora"><span></span>Aurora<small>Dreamy & Cinematic</small></button></div><div class="lab-title">2. Hero Layout</div><div class="lab-pills"><button class="lab-pill active" data-layout="classic">Classic</button><button class="lab-pill" data-layout="split">Split</button><button class="lab-pill" data-layout="full">Fullscreen</button><button class="lab-pill" data-layout="minimal">Minimal</button></div><div class="lab-title">3. Corner Radius <span id="radiusValue">13px</span></div><input class="lab-range" id="radiusRange" type="range" min="0" max="28" value="13"><div class="lab-row"><label>4. Motion Effects</label><button class="lab-switch on" id="motionSwitch"><i></i></button></div><div class="lab-title">5. Animation Style</div><div class="lab-pills"><button class="lab-pill active" data-animation="fade">Fade</button><button class="lab-pill" data-animation="slide">Slide</button><button class="lab-pill" data-animation="zoom">Zoom</button><button class="lab-pill" data-animation="blur">Blur</button></div><div class="lab-title">6. Color Theme</div><div class="lab-colors"><button class="lab-color active" data-gold="#e9bd6b" style="background:#e9bd6b"></button><button class="lab-color" data-gold="#f3d4a0" style="background:#f3d4a0"></button><button class="lab-color" data-gold="#d47b5b" style="background:#d47b5b"></button><button class="lab-color" data-gold="#9ac27d" style="background:#9ac27d"></button><button class="lab-color" data-gold="#83a8ef" style="background:#83a8ef"></button><button class="lab-color" data-gold="#c58bd9" style="background:#c58bd9"></button></div><button class="lab-reset" id="labReset">↻ Reset to Default</button>`;
const trigger = document.createElement('button'); trigger.className='style-lab-trigger'; trigger.innerHTML='<b>◐</b> Style Lab';
document.body.append(labBackdrop, lab, trigger);
function toggleLab(open){lab.classList.toggle('open',open);labBackdrop.classList.toggle('open',open)}
trigger.onclick=()=>toggleLab(true);lab.querySelector('.style-lab-close').onclick=()=>toggleLab(false);labBackdrop.onclick=()=>toggleLab(false);
const themes={midnight:['#172027','#f4f0e8','#e9bd6b'],terracotta:['#33211d','#f7eee4','#d99a68'],garden:['#203126','#f1f3e7','#b6c98d'],paper:['#27313a','#fbfaf6','#c49a5b'],electric:['#171532','#f4f1ff','#a88bff'],aurora:['#202033','#f7f0eb','#d5a6ff']};
function applyTheme(name){const t=themes[name];document.documentElement.style.setProperty('--ink',t[0]);document.documentElement.style.setProperty('--cream',t[1]);document.documentElement.style.setProperty('--gold',t[2]);document.querySelectorAll('.lab-option').forEach(x=>x.classList.toggle('active',x.dataset.theme===name))}
document.querySelectorAll('.lab-option').forEach(x=>x.onclick=()=>applyTheme(x.dataset.theme));
document.querySelector('#radiusRange').oninput=e=>{document.documentElement.style.setProperty('--radius',e.target.value+'px');document.querySelector('#radiusValue').textContent=e.target.value+'px';document.querySelectorAll('.dish-image,.reservation-card,.gallery-item').forEach(x=>x.style.borderRadius=e.target.value+'px')};
document.querySelector('#motionSwitch').onclick=e=>{e.currentTarget.classList.toggle('on');document.body.classList.toggle('no-motion')};
document.querySelectorAll('[data-animation]').forEach(x=>x.onclick=()=>{document.querySelectorAll('[data-animation]').forEach(y=>y.classList.remove('active'));x.classList.add('active');document.body.dataset.animation=x.dataset.animation});
document.querySelectorAll('[data-layout]').forEach(x=>x.onclick=()=>{document.querySelectorAll('[data-layout]').forEach(y=>y.classList.remove('active'));x.classList.add('active');document.querySelector('.hero').style.minHeight=x.dataset.layout==='full'?'100vh':x.dataset.layout==='minimal'?'520px':'650px';document.querySelector('.hero-content').style.maxWidth=x.dataset.layout==='split'?'470px':'650px'});
document.querySelectorAll('.lab-color').forEach(x=>x.onclick=()=>{document.querySelectorAll('.lab-color').forEach(y=>y.classList.remove('active'));x.classList.add('active');document.documentElement.style.setProperty('--gold',x.dataset.gold)});
document.querySelector('#labReset').onclick=()=>{applyTheme('midnight');document.querySelector('#radiusRange').value=13;document.querySelector('#radiusRange').dispatchEvent(new Event('input'));document.querySelector('.hero').style.minHeight='650px';document.querySelector('.hero-content').style.maxWidth='650px'};
