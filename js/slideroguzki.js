const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const slideWidth = 500;
let currentIndex = 0;

// Клонируем слайды для бесконечного эффекта
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

// Дублируем в начало
slides.slice().reverse().forEach(slide => {
  const clone = slide.cloneNode(true);
  track.prepend(clone);
});

const totalSlides = track.children.length;
let position = slides.length; // Начать со 100% оригинального блока

track.style.transform = `translateX(-${position * slideWidth}px)`;

// Функция прокрутки
function moveTo(index) {
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
}

// Переход после перехода, если в клоне
track.addEventListener('transitionend', () => {
  if (currentIndex === 0) {
    track.style.transition = 'none';
    currentIndex = slides.length;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  } else if (currentIndex === totalSlides - 3) {
    track.style.transition = 'none';
    currentIndex = slides.length - 3;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
});

prev.addEventListener('click', () => {
  moveTo(currentIndex - 1);
});

next.addEventListener('click', () => {
  moveTo(currentIndex + 1);
});