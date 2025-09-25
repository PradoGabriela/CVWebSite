const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
     ssl: {
        // For most providers, this is enough:
        //TODO fix
        rejectUnauthorized: false
        // For some, you may need to provide CA certs, etc.
    }

});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Successfully connected to MySQL database!');
        connection.release(); // Release connection back to the pool
    }
});

// Handle database errors and auto-reconnect
pool.on('error', function (err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
        console.log('Reconnecting to MySQL...');
    } else {
        throw err;
    }
});

// Export the connection pool
module.exports = pool;