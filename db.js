
const sql = require('mssql');

// Configure your database connection here
const config = {
    user: 'sa',
    password: 'prime_123$',
    server: '136.185.14.8',
    database: 'schoolTestDB',
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

// Create a pool promise for connection reuse
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // Exit process on failure
    });

module.exports = { sql, poolPromise };
