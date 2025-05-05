const nombreUsuario = localStorage.getItem("usuario") || "Nombre de Usuario";
document.getElementById("nombreUsuario").textContent = nombreUsuario;

// Simular conteo de favoritos
let total = localStorage.length;
let canciones = 0;
let artistas = 0;

for (let i = 0; i < total; i++) {
  const key = localStorage.key(i);
  if (key.startsWith("can_")) canciones++;
  else if (key.startsWith("art_")) artistas++;
}

document.getElementById("totalFavs").textContent = canciones + artistas;
document.getElementById("totalCanciones").textContent = canciones;
document.getElementById("totalArtistas").textContent = artistas;