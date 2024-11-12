const mysql = require('mysql');

//Direccion DB Franco
const conexion = mysql.createConnection({
   host: 'localhost',
   port: 3307,
   user: 'root',
   password: '',
   database: 'am_tp'
//    database: 'atencion_medica'
}); 

//Direccion DB Edu
//  const conexion = mysql.createConnection({
//      host: 'localhost',
//      port: 3306,
//      user: 'root',
//      password: '',
//      database: 'am_tp' 
//  });

//Acá verificamos la conexión
conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + conexion.threadId);
});

module.exports = conexion;