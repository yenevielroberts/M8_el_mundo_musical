// Carga las variables de entorno desde el archivo .env (como la conexión a la base de datos)
require("dotenv").config();

// Importa módulos necesarios
const http = require("http"); // Módulo nativo de Node para crear servidores HTTP
const fs = require("fs"); // Para leer archivos (como HTML, CSS, JS)
const path = require("path"); // Para construir rutas de archivos
const url = require("url"); // Para parsear la URL y obtener parámetros de búsqueda
const db = require("./db"); // Importa la configuración de conexión a PostgreSQL

// Crea el servidor
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parsea la URL con parámetros (ej: ?q=tusa)
    const pathname = parsedUrl.pathname; // Extrae solo la ruta (sin parámetros)

    // Ruta API para buscar canciones o artistas: /api/buscar?q=texto
    if (pathname === "/api/buscar" && req.method === "GET") {
        const q = parsedUrl.query.q; // Obtiene el valor del parámetro 'q'

        if (!q) {
            // Si no se envió 'q', responder con error 400
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Falta el parámetro 'q'" }));
            return;
        }

        try {
            // Consulta a la base de datos con ILIKE (búsqueda insensible a mayúsculas)
            const result = await db.query(
                `SELECT nombre, tipo FROM items WHERE nombre ILIKE $1 LIMIT 10`,
                [`%${q}%`] // Busca coincidencias parciales
            );

            // Devuelve los resultados como JSON
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.rows));
        } catch (error) {
            // Si hay error en la consulta a la BD
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error en la base de datos" }));
        }
        return; // Sale del handler porque ya respondió
    }

    // Ruta para servir archivos estáticos desde la carpeta 'public'
    let filePath = path.join(__dirname, "public", pathname === "/" ? "index.html" : pathname);

    const ext = path.extname(filePath).toLowerCase(); // Obtiene la extensión del archivo solicitado
    const mimeTypes = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
    };

    // Lee el archivo solicitado (por ejemplo /index.html o /js/buscador.js)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Si no existe el archivo, responde 404
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Archivo no encontrado");
        } else {
            // Si lo encuentra, lo devuelve con el Content-Type correcto
            res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
            res.end(data);
        }
    });
});

// Puerto del servidor, puede venir del archivo .env o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
