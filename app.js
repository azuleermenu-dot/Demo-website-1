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
