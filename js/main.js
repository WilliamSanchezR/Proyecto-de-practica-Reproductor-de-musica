const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('#closeMenu');
const sideMenu = document.querySelector('#sideMenu');
const listaReproduccion = document.getElementById("list");

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});

// < ======= Funcion para acortatexto ========== >

function acortarTexto(texto, limite) {
    if (texto.length > limite){
        return texto.substring(0, limite) + "...";
    } else {
        return texto;
    }
}

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
                <button id="list-play"><i class="bi bi-play-fill"></i></button>
        `
        listaReproduccion.appendChild(itemLista);
    })
})

.catch(error => {
    console.error("Hubo un error en la obtencion de los datos: ", error);
});