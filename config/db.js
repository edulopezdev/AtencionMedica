// config/db.js
const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'atencion_medica'
});

// Verificación de conexión
conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + conexion.threadId);
});

module.exports = conexion;