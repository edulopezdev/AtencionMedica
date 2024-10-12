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

// const encriptarContrasena = async (contrasenaPlana) => {
//     try {
//       // Genera el hash de la contraseña
//       const hash = await bcrypt.hash(contrasenaPlana, saltRounds);
//       console.log('Contraseña encriptada:', hash);
//       return hash;
//     } catch (err) {
//       console.error('Error encriptando la contraseña:', err);
//     }
//   };




//============================  ==================================

