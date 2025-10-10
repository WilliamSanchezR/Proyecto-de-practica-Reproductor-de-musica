const coverImg = document.querySelector('.album-cover img');
const titleEl = document.querySelector('.song-title');
const artistEl = document.querySelector('.artist-name');
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
const btnPlay = document.querySelector('.play')
const songEl = document.getElementById('player');

let canciones = [];
let indiceActual = 0;
let enReproduccion = false;

document.addEventListener('DOMContentLoaded', () => {
    fetch("canciones.json")

        .then(response => response.json())

        .then(data => {
            canciones = data;

            // Estoy llamando una funcion que mostrara los datos en la tabla
            mostrarCancion(indiceActual);
        })

        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        })
});

function mostrarCancion(indice) {
    const cancion = canciones[indice];
    coverImg.src = cancion.caratula;
    titleEl.textContent = cancion.nombre;
    artistEl.textContent = cancion.artista;
    songEl.src = cancion.cancion;
};

btnNext.addEventListener('click', () => {
    if (indiceActual === canciones.length - 1) {
        indiceActual = 0
    } else {
        indiceActual++
    }

    mostrarCancion(indiceActual)
});

btnPrev.addEventListener('click', () => {
    if (indiceActual === 0) {
        indiceActual = canciones.length - 1
    } else {
        indiceActual--
    }

    mostrarCancion(indiceActual)
});

btnPlay.addEventListener('click', () =>{
    if (enReproduccion) {
        songEl.pause();
        btnPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
    } else {
        songEl.play();
        btnPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    enReproduccion = !enReproduccion
})