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
