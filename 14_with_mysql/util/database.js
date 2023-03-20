const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'abcd@123'
});

module.exports = pool.promise();