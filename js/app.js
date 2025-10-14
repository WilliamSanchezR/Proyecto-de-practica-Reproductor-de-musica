const coverImg = document.querySelector('.album-cover img');
const titleEl = document.querySelector('.song-title');
const artistEl = document.querySelector('.artist-name');
const songEl = document.getElementById('player');

const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
const btnPlay = document.querySelector('.play');

const barra = document.querySelector('.barra');
const progreso = document.querySelector('.progreso');
const punto = document.querySelector('.punto');

const tiempoActual = document.querySelector('.tiempo-actual');
const duracionTotal = document.querySelector('.duracion-total');

const listaReproduccion = document.getElementById("list");

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
    songEl.pause();  //Pausar antes de cambiar la fuente por que me genra problemas con la promesa
    songEl.src = cancion.cancion; //Cambiar el src y reiniciar el tiempo
    songEl.currentTime = 0;

    // Esperamos a que la canción esté lista antes de reproducir
    songEl.addEventListener('loadeddata', () => {
        if (indice === 0) {
            enReproduccion = false;
            btnPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
        } else {
            enReproduccion = true;
            btnPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
            songEl.play().catch(err => console.warn("No se pudo reproducir:", err));
        }
    }, { once: true });

    progreso.style.width = '0%';
    punto.style.left = '0%';

    duracionTotal.textContent = cancion.duracion;
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


btnPlay.addEventListener('click', () => {
    if (enReproduccion) {
        songEl.pause();
        btnPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
    } else {
        songEl.play();
        btnPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    enReproduccion = !enReproduccion
});

songEl.addEventListener('timeupdate', () => {
    const porcentaje = (songEl.currentTime / songEl.duration) * 100;
    progreso.style.width = `${porcentaje}%`;
    punto.style.left = `${porcentaje}%`;

    tiempoActual.textContent = formatearTiempo(songEl.currentTime);

});

barra.addEventListener('click', (e) => {
    const ancho = barra.clientWidth;
    const clickX = e.offsetX;
    const duracion = songEl.duration;

    songEl.currentTime = (clickX / ancho) * duracion;
});

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${minutos}:${seg.toString().padStart(2, '0')}`;
};

// < ======= Funcion para acortatexto ========== >

function acortarTexto(texto, limite) {
    if (texto.length > limite){
        return texto.substring(0, limite) + "...";
    } else {
        return texto;
    }
}

// < ======= Fetch para mostrar las canciones en un lista desplegable ========== >

fetch("canciones.json")

.then (response => response.json())

.then(data =>{
    console.log("los datos se obtuvieron de manera correcta")

    data.forEach(cancion => {
        const itemLista = document.createElement("li")

        itemLista.setAttribute("class", "menu-links")

        itemLista.innerHTML = `
                <img src="${cancion.caratula}" alt="${cancion.nombre}">
                <h2>${acortarTexto(cancion.nombre, 16)}</h2>
                <h3>${acortarTexto(cancion.artista, 16)}</h3>
                <button class="list-play" value="${cancion.id}"><i class="bi bi-play-fill"></i></button>
        `
        listaReproduccion.appendChild(itemLista);

        const playList = itemLista.querySelector('.list-play');

        playList.addEventListener('click', () => {

            const indice = parseInt(playList.value) - 1;
            indiceActual = indice;
            mostrarCancion(indice);
        })

    })
})

.catch(error => {
    console.error("Hubo un error en la obtencion de los datos: ", error);
});