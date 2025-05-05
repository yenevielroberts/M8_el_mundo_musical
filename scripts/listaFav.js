const listaArt = document.getElementById("listaFavArt");
const listaCan = document.getElementById("listaFavCan");

function renderFavoritos() {
    listaArt.innerHTML = "";
    listaCan.innerHTML = "";

    let tieneArtistas = false;
    let tieneCanciones = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const valor = localStorage.getItem(key);

        // Si es un artista
        if (key.startsWith("art_")) {
            tieneArtistas = true;
            const nombre = key.replace("art_", "")

            const li = document.createElement("li");
            li.innerHTML = `
                <a href="detalle_artistas.html?nombre=${encodeURIComponent(nombre)}">${nombre}</a>
                <button onclick="eliminarFavorito('${key}')">Eliminar</button>
            `;
            listaArt.appendChild(li);
        }

        // Si es una canción
        else if (key.startsWith("can_")) {
            tieneCanciones = true;
            const nombre = key.replace("can_", "")

            const li = document.createElement("li");
            li.innerHTML = `
                <a href="detalle_cancion.html?nombre=${encodeURIComponent(nombre)}">${nombre}</a>
                <button onclick="eliminarFavorito('${key}')">Eliminar</button>
            `;
            listaCan.appendChild(li);
        }
    }

    // Mensaje si no hay favoritos
    if (!tieneArtistas) {
        listaArt.innerHTML = "<li>No tienes artistas favoritos aún.</li>";
    }
    if (!tieneCanciones) {
        listaCan.innerHTML = "<li>No tienes canciones favoritas aún.</li>";
    }
}

function eliminarFavorito(clave) {
    const selector = clave.startsWith("art_") ? listaArt : listaCan;
    const items = selector.querySelectorAll("li");

    items.forEach((li) => {
        if (li.textContent.includes(clave.replace("art_", "").replace("can_", ""))) {
            li.classList.add("fade-out");
            setTimeout(() => {
                localStorage.removeItem(clave);
                renderFavoritos();
            }, 500); // Espera a que termine la animación
        }
    });
}

renderFavoritos();