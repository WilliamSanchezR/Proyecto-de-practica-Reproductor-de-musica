const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('#closeMenu');
const sideMenu = document.querySelector('#sideMenu');

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});
// controles del reproductor
const playBtn = document.querySelector('.play');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying
        ? '<i class="bi bi-pause-fill"></i>'
        : '<i class="bi bi-play-fill"></i>';
});