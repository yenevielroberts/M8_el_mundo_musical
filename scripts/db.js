// Importa Pool de pg para manejar conexiones a PostgreSQL
const { Pool } = require("pg");

// Crea el pool de conexiones usando la variable de entorno DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false // Cambia a true si estás usando una base de datos remota con SSL
});

// Exporta una función query que puedes usar para hacer consultas
module.exports = {
    query: (text, params) => pool.query(text, params),
};
