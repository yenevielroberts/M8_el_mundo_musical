//Obtengo 5 artistas
fetch(`/api/artists?limit=5`)
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("lista-artistas")

        data.forEach(artista => {
            const div = document.createElement("div")
            div.innerHTML`<h3>${artista.stage_name}</h3>
            <a href="detalle_artistas.html?name=${artista.stage_name}"><img src="${artista.image}"></a>`;
            contenedor.appendChild(div)
        })
    })
    .catch(error => {
        console.log('Error al obtener los canciones:', error)
    })


//Obtengo 5 canciones
fetch(`/api/songs?limit=5`)
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("lista-canciones")

        data.forEach(cancion => {
            const div = document.createElement("div")
            div.innerHTML`<h3>${cancion.name}</h3>
            <a href="detalle_cancion.html?name=${cancion.name}"><img src="${cancion.image}"></a>`;
            contenedor.appendChild(div)
        })
    })
    .catch(error => {
        console.log('Error al obtener los canciones:', error)
    })


//Obtengo 5 albumes

fetch(`/api/albums?limit=5`)
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById("lista-albumes")

        data.forEach(album => {
            const div = document.createElement("div")
            div.innerHTML`<h3>${album.title}</h3>
            <a href="detalle_cancion.html?name=${album.name}"><img src="${album.image}"></a>`;
            contenedor.appendChild(div)
        })
    })
    .catch(error => {
        console.log('Error al obtener los canciones:', error)
    })

    
// Función para cargar más artistas
document.getElementById("verMasArtistas").addEventListener("click", async () => {
    const res = await fetch("/api/artists?limit=5");
    const artistas = await res.json();
    const contenedor = document.getElementById("lista-artistas");

    // Por cada artista que recibimos, agregamos un div con el nombre y la imagen
    artistas.forEach(artista => {
        const div = document.createElement("div");
        div.innerHTML = `
                <h3>${artista.stage_name}</h3>
                <p>Nombre real:${artista.real_name} </p<
                <a href="detalle_artistas.html?name=${artista.stage_name}"><img src="${artista.imagen_url}" alt="${artista.stage_name}"></a>
            `;
        contenedor.appendChild(div);
    });
});

// Función para cargar más canciones
document.getElementById("verMasCanciones").addEventListener("click", async () => {
    const res = await fetch("/api/songs?limit=5");
    const canciones = await res.json();
    const contenedor = document.getElementById("lista-canciones");

    // Por cada canción que recibimos, agregamos un div con el nombre y la imagen
    canciones.forEach(cancion => {
        const div = document.createElement("div");
        div.innerHTML = `
                <h3>${cancion.nombre}</h3>
                <a href="detalle_cancion.html"><img src="${cancion.imagen_url}" alt="${cancion.nombre}"></a>
            `;
        contenedor.appendChild(div);
    });
});

// Función para cargar más álbumes
document.getElementById("verMasAlbumes").addEventListener("click", async () => {
    const res = await fetch("/api/albums?limit=5");
    const albumes = await res.json();
    const contenedor = document.getElementById("lista-albumes");

    // Por cada álbum que recibimos, agregamos un div con el nombre y la imagen
    albumes.forEach(album => {
        const div = document.createElement("div");
        div.innerHTML = `
                <h3>${album.nombre}</h3>
                <a href="detalle_album.html"><img src="${album.imagen_url}" alt="${album.nombre}"></a>
            `;
        contenedor.appendChild(div);
    });
});