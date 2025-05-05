//Boton favorito
const favBtn = document.getElementById('favBtn');
const cancion = document.getElementById("can_nom").textContent;

console.log(cancion)

// Cambia ícono si ya está en favoritos
if (localStorage.getItem(cancion)) {
    favBtn.innerHTML = '<i class="fa-solid fa-heart"></i> En favoritos';
}

favBtn.addEventListener('click', () => {
    if (!localStorage.getItem(cancion)) {
        localStorage.setItem("can_" + cancion, true);
        favBtn.innerHTML = '<i class="fa-solid fa-heart"></i> En favoritos';
        alert("¡Agregado a favoritos!");
    } else {
        localStorage.removeItem(cancion);
        favBtn.innerHTML = '<i class="fa-regular fa-heart"></i> Agregar a favoritos';
        alert("Removido de favoritos.");
    }
});

console.log(localStorage)


//función para obtener el parametro de la url
function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const parametro = getParam('name');//nombre del artista
const albumName = "";
//Obtengo la cancion
fetch(`/api/songs?name=${parametro}`)
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("container")
        const nombre = document.getElementById("can_nom");
        const img = document.getElementById("img_cancion");
        const section = document.getElementById("info_can");
        const sectionEstadi = document.getElementById("monthly_listeners")

        albumName = cancion.album_name
        data.forEach(cancion => {
            nombre.textContent = cancion.artist_name;
            img.setAttribute("src", `${cancion.image}`);
            section.innerHTML`  <h3>Genero:</h3>
            <p>${cancion.genre}</p>
            <h3>Artista:</h3>
            <a href="detalle_artistas.html">${cancion.artist_name}</a>
            <h3>Released:${cancion.release_date}</h3><br><br>
            <h3 id="historia_titu">Historia</h3>
            <p>${cancion.story} </p>
            <h3>Letra: </h3>
            <p>${cancion.lyrics}</p>`;

            sectionEstadi.innerHTML = `
            <h2>Estadistcas</h2>
            <ul>
                <li>Número de oyentes mensual: ${cancion.monthly_listeners}</li>
            </ul>`
            contenedor.append(nombre, img, section);
        });
    })
    .catch(error => {
        console.error('Error al obtener los artistas:', error);
    })


//Obtengo el álbum
fetch(`/api/album?name=${albumName}`)
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("albumes_po")
        data.forEach(album => {
            section.innerHTML`<h3>Álbum: ${album.name}</h3>
            <img src="${album.imgage}">`;
            contenedor.append(section);
        });
    })
    .catch(error => {
        console.error('Error al obtener los artistas:', error);
    })