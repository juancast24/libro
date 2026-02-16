let currentSlide = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

function updateSlide() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

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
    currentSlide = (currentSlide + 1) % totalSlides;
  } else if (diff < -50) {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }

  updateSlide();
}

// Inicializar
updateSlide();
