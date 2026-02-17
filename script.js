let currentSlide = 0;

const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const totalSlides = slideElements.length;
const indicator = document.querySelector(".indicator");

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function updateSlide() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  indicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

/* Swipe móvil */
let startX = 0;
let endX = 0;

slides.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  if (diff > 50) {
    nextSlide();
  } else if (diff < -50) {
    prevSlide();
  }
}

/* Soporte teclado */
document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

/* Inicializar */
updateSlide();
