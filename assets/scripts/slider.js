const sliderImages = document.querySelector('.slider-images');
const images = document.querySelectorAll('.slider-images img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
let startX = 0;
let endX = 0;

function showSlide() {
  if (window.matchMedia("(min-width: 1200px)").matches) {
    sliderImages.style.transform = `translateX(${-index * 50}%)`;
  } else {
    sliderImages.style.transform = `translateX(${-index * 101}%)`;
  }
}

nextBtn.addEventListener('click', () => {
  index++;
  if (index > images.length - 2) index = 0; 
  showSlide();
});

prevBtn.addEventListener('click', () => {
  index--;
  if (index < 0) index = images.length - 2;  
  showSlide();
});

sliderImages.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

sliderImages.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;

  if (diff > 50) {
    index++;
    if (index >= images.length) index = 0;
    showSlide();
  } else if (diff < -50) {
    index--;
    if (index < 0) index = images.length - 1;
    showSlide();
  }
}

setInterval(() => {
  index++;
  if (index >= images.length) index = 0;
  showSlide();
}, 10000);


document.addEventListener("DOMContentLoaded", () => {
  const typeButtons = document.querySelectorAll(".plants-type-btn");
  const sliders = document.querySelectorAll(".plants-slider");
  const prevBtn = document.querySelector(".prev-plant");
  const nextBtn = document.querySelector(".next-plant");

  const currentIndexes = {};

  sliders.forEach(slider => {
    currentIndexes[slider.id] = 0;
  });

  function updateSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const index = currentIndexes[sliderId];

    // Sempre 1 slide por vez
    const offset = -index * 100.2;

    slider.style.transform = `translateX(${offset}%)`;
  }


  typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      typeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedType = btn.dataset.type;

      sliders.forEach(s => s.style.display = "none");
      const activeSlider = document.getElementById("plantSlider" + selectedType);
      activeSlider.style.display = "flex";
      currentIndexes[activeSlider.id] = 0;
      updateSlider(activeSlider.id);
    });
  });
  function getActiveSliderId() {
    const activeSlider = Array.from(sliders).find(s => s.style.display !== "none");
    return activeSlider ? activeSlider.id : null;
  }

  nextBtn.addEventListener("click", () => {
    const activeSliderId = getActiveSliderId();
    if (!activeSliderId) return;

    const slider = document.getElementById(activeSliderId);
    const slides = slider.querySelectorAll(".plant-slide-info-image");

    currentIndexes[activeSliderId]++;
    if (currentIndexes[activeSliderId] >= slides.length) {
      currentIndexes[activeSliderId] = 0; // loop
    }
    updateSlider(activeSliderId);
  });

  prevBtn.addEventListener("click", () => {
    const activeSliderId = getActiveSliderId();
    if (!activeSliderId) return;

    const slider = document.getElementById(activeSliderId);
    const slides = slider.querySelectorAll(".plant-slide-info-image");

    currentIndexes[activeSliderId]--;
    if (currentIndexes[activeSliderId] < 0) {
      currentIndexes[activeSliderId] = slides.length - 1;
    }
    updateSlider(activeSliderId);
  });

  updateSlider("plantSlider262");
});
