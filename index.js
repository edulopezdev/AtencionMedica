const express = require('express');
const app = express();
const path = require('path');

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

const mysql = require('mysql');

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


//============================  ==================================

// Configuración del puerto
const PORT = process.env.PORT || 7000; // Usa el puerto del entorno o el 3000 por defecto

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
