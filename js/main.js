const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('#closeMenu');
const sideMenu = document.querySelector('#sideMenu');

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});