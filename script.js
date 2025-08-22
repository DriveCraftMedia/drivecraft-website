// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
if (burger) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open');
  });
}

// Hero slider
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.hero-dots .dot'));
let i = 0, timer;

function goTo(n){
  slides[i].classList.remove('current');
  dots[i].classList.remove('current');
  i = (n + slides.length) % slides.length;
  slides[i].classList.add('current');
  dots[i].classList.add('current');
  restart();
}

function next(){ goTo(i+1); }
function restart(){
  clearInterval(timer);
  timer = setInterval(next, 5000);
}
dots.forEach((d,idx)=> d.addEventListener('click',()=>goTo(idx)));
restart();

// Simple intersection reveal
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
