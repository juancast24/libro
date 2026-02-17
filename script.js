let currentSlide = 0;

const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const totalSlides = slideElements.length;
const indicator = document.querySelector(".indicator");

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let isAnimating = false;

/*NAV BOTONES*/

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function nextSlide() {
  if (isAnimating) return;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  if (isAnimating) return;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function updateSlide() {
  isAnimating = true;

  slides.style.transition = "transform 0.4s ease";
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  indicator.textContent = `${currentSlide + 1} / ${totalSlides}`;

  setTimeout(() => {
    isAnimating = false;
  }, 400);
}

/* SWIPE */

let startX = 0;
let currentX = 0;
let isDragging = false;

slides.addEventListener("pointerdown", (e) => {
  if (isAnimating) return;

  startX = e.clientX;
  isDragging = true;
  slides.style.transition = "none";
});

slides.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  const diff = currentX - startX;

  slides.style.transform =
    `translateX(calc(-${currentSlide * 100}% + ${diff}px))`;
});

slides.addEventListener("pointerup", handleSwipeEnd);
slides.addEventListener("pointercancel", handleSwipeEnd);
slides.addEventListener("pointerleave", handleSwipeEnd);

function handleSwipeEnd(e) {
  if (!isDragging) return;

  const diff = e.clientX - startX;
  const threshold = 80; 

  slides.style.transition = "transform 0.4s ease";

  if (diff < -threshold && currentSlide < totalSlides - 1) {
    currentSlide++;
  } else if (diff > threshold && currentSlide > 0) {
    currentSlide--;
  }

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  indicator.textContent = `${currentSlide + 1} / ${totalSlides}`;

  isDragging = false;
}


document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});


updateSlide();
