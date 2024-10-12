const express = require('express');
const app = express();
const path = require('path');
//para DB==========
const mysql = require('mysql');
const bodyParser = require('body-parser'); // O express.urlencoded
// const bcrypt = require('bcrypt');
// const saltRounds = 1;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la vista de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//============================ PUG ==================================

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login');
});
// Ruta para redirigir a la página de inicio de sesión
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirige a /login
});


// Ruta para la página de inicio
app.get('/index', (req, res) => {
    res.render('index'); // Renderiza la vista de la página de inicio
});

//============================ Conexion DB ==================================

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true })); // O app.use(express.urlencoded({ extended: true }));


// Creamos la conexion a la base
const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'test7'
});

// Verificacion en server de conexion----solo mensaje
conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + conexion.threadId);
});

//-------------- User y Pass----------------------

// Ruta para manejar la autenticación
app.post('/login', (req, res) => {
    const usuario = req.body.usuario; // Obtén el usuario del formulario
    const contrasenia = req.body.contrasenia; // Obtén la contraseña del formulario

    // Consulta a la base de datos
    const query = 'SELECT * FROM medico WHERE matricula_medico = ? AND password = ?';
    conexion.query(query, [usuario, contrasenia], (error, resultados) => {
        if (error) {   //ver de crear algo visual !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            console.error('Error en la consulta:', error);
            return res.status(500).send('Error en la base de datos');
        }

        if (resultados.length > 0) {

            // El usuario y la contraseña son correctos
            res.redirect('/main'); // llamdo a metodo
        } else {
            // Credenciales incorrectas----ver de crear algo visual !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            res.send('Usuario o contraseña incorrectos');
        }
    });
});

//--------------------consulta especialidades------------

// Ruta para la página de inicio
app.get('/especialidades', (req, res) => {
    // Consulta para obtener las especialidades de la base de datos
    const query = 'SELECT * FROM especialidad'; // Ajusta esta consulta según tu modelo de datos
    conexion.query(query, (error, resultados) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send('Error en la base de datos');
        }
        console.log('Resultados de especialidades:', resultados); // Agrega este log
        // Renderiza la vista y pasa las especialidades
        res.render('index', { especialidades: resultados });
    });
});


//-----------------------Consulta multiple-------------------

app.get('/main', (req, res) => {
    // Consulta para obtener las especialidades, médicos y turnos
    const queryEspecialidades = 'SELECT * FROM especialidad';
    const queryMedicos = 'SELECT * FROM medico'; // Ajusta la consulta a tu modelo de datos
    const queryMedicosEspecialidad = 'SELECT * FROM medico_especialidad';
    // Promesas para manejar las consultas de manera paralela
    const consultaEspecialidades = new Promise((resolve, reject) => {
        conexion.query(queryEspecialidades, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });

    const consultaMedicos = new Promise((resolve, reject) => {
        conexion.query(queryMedicos, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });

    const consultaMedicosEspecialidad = new Promise((resolve, reject) => {
        conexion.query(queryMedicosEspecialidad, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });

    // Ejecutar todas las consultas en paralelo
    Promise.all([consultaEspecialidades, consultaMedicos, consultaMedicosEspecialidad])
        .then(([especialidades, medicos, medicoEspecialidad]) => {
            // Renderiza la vista y pasa los resultados
            //console.log(especialidades, medicos);
            res.render('index', { especialidades, medicos, medicoEspecialidad});
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
});




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

// Configuración del puerto
const PORT = process.env.PORT || 7000; // Usa el puerto del entorno o el 3000 por defecto

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});