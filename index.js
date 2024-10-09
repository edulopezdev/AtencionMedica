const express = require('express');
const app = express();
const path = require('path');
//para DB==========
const mysql = require('mysql');
const bodyParser = require('body-parser'); // O express.urlencoded

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la vista de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//============================ PUG ==================================
// Ruta para redirigir a la página de inicio de sesión
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirige a /login
});

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login');
});

//============================ Conexion DB ==================================

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true })); // O app.use(express.urlencoded({ extended: true }));


// create a connection
const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3307,   
    user: 'root',
    password: '',
    database: 'test7'
});

// Conexión a la base de datos
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
            res.redirect('/index'); // Redirigir a la página de index
        } else {
            // Credenciales incorrectas----ver de crear algo visual !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            res.send('Usuario o contraseña incorrectos');
        }
    });
});


//============================  ==================================

// Configuración del puerto
const PORT = process.env.PORT || 7000; // Usa el puerto del entorno o el 3000 por defecto

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
