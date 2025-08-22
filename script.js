// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      nav?.classList.remove('open');
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:0.14});
document.querySelectorAll('.reveal, .service, .case, .tcard, .faq-item, .section-head').forEach(el=> io.observe(el));

// Hero slider (auto + dots)
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots   = Array.from(document.querySelectorAll('.hero-dots .dot'));
let i = 0, timer;

function go(n){
  slides[i].classList.remove('current');
  dots[i].classList.remove('current');
  i = (n + slides.length) % slides.length;
  slides[i].classList.add('current');
  dots[i].classList.add('current');
}
function next(){ go(i+1); }
function play(){ stop(); timer = setInterval(next, 5200); }
function stop(){ clearInterval(timer); }

dots.forEach((d, idx)=> d.addEventListener('click', ()=>{ stop(); go(idx); play(); }));
play();

// Subtle hero parallax
const hero = document.querySelector('.hero');
const overlay = document.querySelector('.hero-overlay');
hero?.addEventListener('mousemove',(e)=>{
  const r = hero.getBoundingClientRect();
  const x = (e.clientX - r.left)/r.width - .5;
  const y = (e.clientY - r.top)/r.height - .5;
  overlay.style.transform = `translate3d(${x*6}px, ${y*6}px, 0)`;
});
hero?.addEventListener('mouseleave',()=> overlay.style.transform = 'translate3d(0,0,0)');

// Focus ring helper
document.querySelectorAll('input, textarea, button, a').forEach(el=>{
  el.addEventListener('focus', ()=> el.classList.add('focus'));
  el.addEventListener('blur',  ()=> el.classList.remove('focus'));
});
