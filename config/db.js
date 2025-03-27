const { Pool } = require("pg");

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,                  // Default PostgreSQL port
});

// Check database connection


module.exports = pool;