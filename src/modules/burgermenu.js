const burger = document.querySelector('.burger');
const navi = document.querySelector('.navigation__list');



burger.addEventListener('click', menuToggeling);

function menuToggeling() {
    if(!burger.classList.contains('active')){
        burger.classList.add('active');
        navi.classList.add('active');
    } else if (burger.classList.contains('active')){
        burger.classList.remove('active');
        navi.classList.remove('active');
    }
}