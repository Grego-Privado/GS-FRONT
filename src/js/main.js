
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

// DECLARANDO AS VARIÁVEIS

const hamburguer = document.querySelector(".hamburguer");
const headerMenu = document.querySelector(".menu");

//CRIANDO A FUNÇÃO TOGGLE

function toggleMenu(){
    hamburguer.classList.toggle("active");
    headerMenu.classList.toggle("active");
}

//CRIANDO O EVENTO

hamburguer.addEventListener('click',toggleMenu);
headerMenu.addEventListener('click',(e)=>{
    if(e.target.classList.contains('item-menu')){
        toggleMenu();
}})