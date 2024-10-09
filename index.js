const express = require('express');
const app = express();
const path = require('path');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la vista de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Ruta para redirigir a la página de inicio de sesión
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirige a /login
});

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login');
});

// Configuración del puerto
const PORT = process.env.PORT || 7000; // Usa el puerto del entorno o el 3000 por defecto

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
