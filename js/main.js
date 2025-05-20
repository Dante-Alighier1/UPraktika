const track = document.querySelector('.menu-slider-track');
const slides = document.querySelectorAll('.menu-slide');
const dotsContainer = document.querySelector('.dots');
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;


slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
});

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
  dotsContainer.children[currentIndex].classList.add('active');
}


function touchStart(event) {
  isDragging = true;
  startX = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  track.classList.add('grabbing');
}

function touchMove(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startX;
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  track.classList.remove('grabbing');
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = -currentIndex * track.clientWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
  updateSlider();
}


track.addEventListener('mousedown', touchStart);
track.addEventListener('mousemove', touchMove);
track.addEventListener('mouseup', touchEnd);
track.addEventListener('mouseleave', () => isDragging && touchEnd());
track.addEventListener('touchstart', touchStart);
track.addEventListener('touchmove', touchMove);
track.addEventListener('touchend', touchEnd);


updateSlider();

document.addEventListener('DOMContentLoaded', function () {
  const playButton = document.querySelector('.play-button');
  const video = document.getElementById('myVideo');

  playButton.addEventListener('click', () => {
    video.play();
    playButton.style.display = 'none';
  });
});