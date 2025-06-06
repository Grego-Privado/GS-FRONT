
/*Slide show*/
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

prev.addEventListener('click', () => {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  showSlide(currentSlide);
});

next.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);

// Alternar modo escuro
document.getElementById('modo-toggle').onclick = () => {
  document.body.classList.toggle('dark');
};

// Menu ativo
const links = document.querySelectorAll('.menu a');
window.addEventListener('scroll', () => {
  const pos = window.scrollY;
  links.forEach(link => {
    const sec = document.querySelector(link.getAttribute('href'));
    if (sec.offsetTop <= pos + 100 && sec.offsetTop + sec.offsetHeight > pos + 100) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Hamburguer menu (mobile)
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('menu-ativo');
});