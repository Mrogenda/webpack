
const slideContainer = document.querySelector('.bgContainer');
const slides = slideContainer.getElementsByTagName('div');
const dotCont = document.querySelector('.sliderProgress');
const dots = dotCont.getElementsByTagName('span');
const txt = document.querySelector('.progress--actual');

let i = 0;

let forward = document.querySelector('.arrowRight');
let previous = document.querySelector('.arrowLeft');

forward.addEventListener('click', nextSlide);
previous.addEventListener('click', prevSlide);


function nextSlide() {
    slides[i].classList.remove('active');
    dots[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
    dots[i].classList.add('active')
    txt.innerHTML = '0' + [i + 1] + '/';
};

function prevSlide() {
    slides[i].classList.remove('active');
    dots[i].classList.remove('active');
    i = (i - 1 + slides.length) % slides.length;
    slides[i].classList.add('active')
    dots[i].classList.add('active')
    txt.innerHTML = '0' + [i + 1] + '/';
};

function autoCycle() {
    setInterval(nextSlide, 6000);
}

autoCycle();