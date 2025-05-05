//Boton de favorito
const favBtn = document.getElementById('favBtn');
const artista = document.getElementById("art_nom").textContent;

// Cambia ícono si ya está en favoritos
if (localStorage.getItem(artista)) {
    favBtn.innerHTML = '<i class="fa-solid fa-heart"></i> En favoritos';
}

favBtn.addEventListener('click', () => {
    if (!localStorage.getItem(artista)) {
        localStorage.setItem("art_" + artista, true);
        favBtn.innerHTML = '<i class="fa-solid fa-heart"></i> En favoritos';
        alert("¡Agregado a favoritos!");
    } else {
        localStorage.removeItem(artista);
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

//Obtengo los artistas
fetch(`/api/artists?name=${parametro}`)
.then(response=> response.json())
.then(data=>{
    const contenedor = document.getElementById("container")
    const nombre=document.getElementById("art_nom");
    const bio=document.getElementById("bio");
    const img=document.getElementById("img");

    data.forEach(artista=>{
        nombre.textContent=artista.stage_name;
        bio.textContent=artista.biografia;
        img.setAttribute("src",`${artista.image}`)
        contenedor.append(nombre,bio);
    });
})
.catch(error=>{
    console.error('Error al obtener los artistas:', error);
})

//Obtengo las canciones
fetch(`/api/song?artist_name=${parametro}`)
.then(response => response.json())
.then(data =>{
    const listaCanciones=document.getElementById("lista-canciones")

    data.forEach(cancion =>{
        const li=document.createElement("li")
        li.innerHTML`<a href="detalle_cancion.html?name=${cancion.name}">
                <p>${cancion.name}</p>
            </a>`;
        listaCanciones.appendChild(li)
    })
})
.catch(error =>{
    console.log('Error al obtener los canciones:', error)
})

  //Obtengo los albumes
  fetch(`/api/albums?artist_name=${parametro}`)
.then(response => response.json())
.then(data =>{
    const listaalbumes=document.getElementById("lista-albumes")

    data.forEach(album =>{
        const li=document.createElement("li")
        li.innerHTML`<h3>${album.name}</h3>
                    <img src="${album.image}">
                    <div id="album_info">
                        <p><strong>Released:</strong>${album.release_date} </p>
                        <p><strong>Número de canciones: </strong>${album.number_songs}</p>
                    </div>`;
        listaalbumes.appendChild(li)
    })
})
.catch(error =>{
    console.log('Error al obtener los canciones:', error)
})

