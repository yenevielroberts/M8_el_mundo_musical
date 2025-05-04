// authServer.js

/*Hay que instalar

npm install pg bcrypt cookie

*/
const http = require("http");                  // Módulo nativo para crear un servidor HTTP
const { Pool } = require("pg");                // Cliente de PostgreSQL
const bcrypt = require("bcrypt");              // Para comparar contraseñas de forma segura
const crypto = require("crypto");              // Para generar tokens aleatorios
const cookie = require("cookie");              // Para parsear y crear cookies

// Configuración de conexión a PostgreSQL
const db = new Pool({
  user: "tu_usuario",
  host: "localhost",
  database: "tu_base_de_datos",
  password: "tu_contraseña",
  port: 5432
});

// Objeto para guardar sesiones activas (token => username)
const sesiones = {};

// Función para manejar las peticiones HTTP
const server = http.createServer(async (req, res) => {
  // Solo nos interesa el método POST a /api/login
  if (req.method === "POST" && req.url === "/api/login") {
    let body = "";

    // Recolectamos los datos enviados en el body
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { username, password } = JSON.parse(body); // Parseamos el body

        // Buscamos el usuario por nombre en la base de datos
        const result = await db.query("SELECT * FROM usuarios WHERE nombre = $1", [username]);

        if (result.rows.length === 0) {
          // Usuario no encontrado
          res.writeHead(401);
          res.end("Usuario no encontrado");
          return;
        }

        const user = result.rows[0];

        // Verificamos si la contraseña es correcta usando bcrypt
        const passwordCorrecta = await bcrypt.compare(password, user.password);

        if (!passwordCorrecta) {
          // Contraseña incorrecta
          res.writeHead(401);
          res.end("Contraseña incorrecta");
          return;
        }

        // Autenticación exitosa: generamos un token de sesión
        const token = crypto.randomBytes(32).toString("hex");

        // Guardamos el token asociado al nombre del usuario
        sesiones[token] = user.nombre;

        // Enviamos una cookie al cliente con el token
        res.writeHead(200, {
          "Set-Cookie": cookie.serialize("token", token, {
            httpOnly: true,         // La cookie no se puede acceder desde JS del cliente
            maxAge: 60 * 60 * 24    // 1 día de duración
          }),
          "Content-Type": "text/plain"
        });

        res.end("Login exitoso");
      } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error interno del servidor");
      }
    });

  } else if (req.method === "GET" && req.url === "/api/perfil") {
    // Verificamos el token desde la cookie para saber si el usuario está autenticado
    const cookies = cookie.parse(req.headers.cookie || "");
    const username = sesiones[cookies.token];

    if (!username) {
      res.writeHead(401);
      res.end("No autorizado");
      return;
    }

    // Usuario autenticado, enviamos su nombre
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ username }));
  }

  else {
    // Cualquier otra ruta o método no está permitido
    res.writeHead(404);
    res.end("Ruta no encontrada");
  }
});

// Inicia el servidor en el puerto 3000
server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
