const pg = require("pg");
pg.defaults.ssl = true

// PostgreSQL Connection Configuration
const pool = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,                  // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // Disable SSL certificate validation if necessary
    },
});

// Check database connection


module.exports = pool;