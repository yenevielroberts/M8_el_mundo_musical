// Espera a que el DOM esté completamente cargado antes de ejecutar
document.addEventListener("DOMContentLoaded", () => {

    // Selecciona el campo de búsqueda por su ID
    const input = document.getElementById("search");

    // Selecciona el contenedor donde se mostrarán los resultados
    const resultados = document.getElementById("resultados");

    // Escucha cada vez que el usuario escribe en el input
    input.addEventListener("input", async () => {
        const query = input.value.trim(); // Elimina espacios al inicio y final

        // Si el campo está vacío, limpia los resultados y termina
        if (!query) {
            resultados.innerHTML = "";
            return;
        }

        try {
            // Hace una petición GET al backend, con el texto de búsqueda como parámetro
            const res = await fetch(`/api/buscar?q=${encodeURIComponent(query)}`);

            // Si hubo un error en la respuesta, lanza una excepción
            if (!res.ok) throw new Error("Error en la búsqueda");

            // Convierte la respuesta JSON a un objeto de JavaScript
            const data = await res.json();

            // Muestra los resultados en la página
            resultados.innerHTML = data.map(item => `
                <li>
                    <strong>${item.nombre}</strong> <em>(${item.tipo})</em>
                </li>
            `).join("");

        } catch (err) {
            // Si ocurre un error, muestra un mensaje en consola y borra resultados
            console.error(err);
            resultados.innerHTML = "<li>Error al buscar resultados</li>";
        }
    });
});
