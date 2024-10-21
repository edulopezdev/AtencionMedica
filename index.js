const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');  // Importamos las rutas de la carpeta routes
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
//para DB==========
//const mysql = require('mysql');
const bodyParser = require('body-parser'); // O express.urlencoded
// const bcrypt = require('bcrypt');
// const saltRounds = 1;

//Sesiones
// Otras configuraciones (middlewares, rutas, etc.)
const session = require('express-session'); 
app.use(express.json()); // Si necesitas manejar JSON en tu aplicación

// Configuración de express-session
app.use(session({
  secret: 'claveSecreta',   // Cambia por una clave secreta más segura
  resave: false,            // No volver a guardar la sesión si no ha sido modificada
  saveUninitialized: true,  // Guardar sesiones nuevas aunque no tengan datos
  cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true })); // O app.use(express.urlencoded({ extended: true }));

// Todas las rutas definidas en mainRoutes estarán bajo "/"
app.use('/', mainRoutes); 
app.use('/', authRoutes);  // Rutas de autenticación


// Configuración de la vista de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));






// Configuración del puerto
const PORT = process.env.PORT || 7000; // Usa el puerto del entorno o el 3000 por defecto

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});






//-------------- User y Pass----------------------



//-----------------------Consulta multiple para main-------------------

// app.get('/main', (req, res) => {
//     // Ejecutar todas las consultas en paralelo usando las funciones
//     Promise.all([obtenerEspecialidades(), obtenerMedicos(), obtenerMedicosEspecialidad()])
//         .then(([especialidades, medicos, medicoEspecialidad]) => {
//             // Renderiza la vista y pasa los resultados
//             res.render('index', { especialidades, medicos, medicoEspecialidad });
//         })
//         .catch((error) => {
//             console.error('Error en las consultas:', error);
//             res.status(500).send('Error en la base de datos');
//         });
// });





//============================ Encriptado ======================

/////////////////////////////////////////////////////////
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const saltRounds = 10; // Establecemos el número de rondas para encriptar
// const conexion = mysql.createConnection({
//     host: 'localhost',
//     port: 3307,
//     user: 'root',
//     password: '',
//     database: 'atencion_medica'
// });  
// Función para encriptar contraseñas
// const encriptarContrasenas = async () => {
//     // Recuperar todos los médicos de la base de datos
//     const query = 'SELECT matricula_medico, password FROM medico';

//     conexion.query(query, async (error, resultados) => {
//         if (error) {
//             console.error('Error al obtener los médicos:', error);
//             return;
//         }

//         for (const medico of resultados) {
//             // Encriptar la contraseña
//             const contraseniaEncriptada = await bcrypt.hash(medico.password, saltRounds);

//             // Actualizar la contraseña en la base de datos
//             const updateQuery = 'UPDATE medico SET password = ? WHERE matricula_medico = ?';
//             conexion.query(updateQuery, [contraseniaEncriptada, medico.matricula_medico], (error) => {
//                 if (error) {
//                     console.error(`Error al actualizar la contraseña para ${medico.matricula_medico}:`, error);
//                 } else {
//                     console.log(`Contraseña encriptada y actualizada para ${medico.matricula_medico}`);
//                 }
//             });
//         }

//         // Cerrar la conexión después de que todas las actualizaciones se hayan completado
//         conexion.end();
//     });
// };
// encriptarContrasenas();
//==================================================
//============================  ==================================

