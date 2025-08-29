const sliderImages = document.querySelector('.slider-images');
const images = document.querySelectorAll('.slider-images img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
let startX = 0;
let endX = 0;

function showSlide() {
    sliderImages.style.transform = `translateX(${-index * 101}%)`;
}

nextBtn.addEventListener('click', () => {
    index++;
    if (index >= images.length) index = 0;
    showSlide();
});

prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = images.length - 1;
    showSlide();
});


// Detecta início do toque
sliderImages.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

// Detecta fim do toque
sliderImages.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    let diff = startX - endX;

    if (diff > 50) {
        // deslizou para a esquerda → próximo
        index++;
        if (index >= images.length) index = 0; // volta pro início
        showSlide();
    } else if (diff < -50) {
        // deslizou para a direita → anterior
        index--;
        if (index < 0) index = images.length - 1; // volta pro último
        showSlide();
    }
}

// autoplay (opcional)
setInterval(() => {
    index++;
    if (index >= images.length) index = 0;
    showSlide();
}, 4000);


// Slider plants
const plantsData = {
  262: [
    "https://i.ibb.co/HDQmRgfK/Planta-Tipo-com-Diferenciais-262-M.jpg",
    "https://i.ibb.co/CD616Dw/Planta-Opcao-3-Decorado-262-M.jpg",
    "https://i.ibb.co/twfXhyy1/Planta-Opcao-2-262-M.jpg",
    "https://i.ibb.co/ds1srcSh/Planta-Opcao-1-262-M.jpg",
    "https://i.ibb.co/6JNgMbjD/Planta-Padrao-262-M.jpg"
  ],
  482: [
    "https://i.ibb.co/6f2nxgL/Planta-Cobertura-Duplex-Superior-482-M.jpg",
    "https://i.ibb.co/PsWyr3dw/Planta-Cobertura-Duplex-Inferior-482-M.jpg"
  ]
};

const plantsInfo = {
  262: [
    "Planta Tipo com Diferenciais 262 M²",
    "Planta Opção 3 Decorado 262 M²",
    "Planta Opção 2 262 M²",
    "Planta Opção 1 262 M²",
    "Planta Padrão 262 M²"
  ],
  482: [
    "Planta Cobertura Duplex Superior 482 M²",
    "Planta Cobertura Duplex Inferior 482 M²"
  ]
};

const plantSlider = document.querySelector(".plants-slider");
const prevBtnPlants = document.querySelector(".prev-plant");
const nextBtnPlants = document.querySelector(".next-plant");
const typeBtns = document.querySelectorAll(".plants-type-btn");

let currentType = "262";
let currentPlantIndex = 0;

function loadPlantImages(type) {
  plantSlider.innerHTML = "";
  plantsData[type].forEach((src, index) => {
    const slide = document.createElement("div");
    slide.classList.add("plant-slide");

    const img = document.createElement("img");
    img.src = src;

    const info = document.createElement("div");
    info.classList.add("plant-info");
    info.innerText = plantsInfo[type][index];

    slide.appendChild(img);
    slide.appendChild(info);
    plantSlider.appendChild(slide);
  });

  plantSlider.style.transform = "translateX(0)";
  currentPlantIndex = 0;
}
function showPlantSlide() {
  plantSlider.style.transform = `translateX(${-currentPlantIndex * 100}%)`;
}

prevBtnPlants.addEventListener("click", () => {
  if (currentPlantIndex > 0) {
    currentPlantIndex--;
    showPlantSlide();
  }
});

nextBtnPlants.addEventListener("click", () => {
  if (currentPlantIndex < plantsData[currentType].length - 1) {
    currentPlantIndex++;
    showPlantSlide();
  }
});

typeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    typeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    loadPlantImages(currentType);
  });
});

// Inicializa com 262m²
loadPlantImages(currentType);
