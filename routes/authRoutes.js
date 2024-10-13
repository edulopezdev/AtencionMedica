// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { autenticarMedico } = require('../services/db-services');


// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista 'login'
});

// Ruta para redirigir a la página de inicio de sesión desde "/"
router.get('/', (req, res) => {
    res.redirect('/login'); // Redirige a /login
});


// Ruta para manejar la autenticación
router.post('/login', async (req, res) => {
    const usuario = req.body.usuario; // Obtén el usuario del formulario
    const contrasenia = req.body.contrasenia; // Obtén la contraseña del formulario

    try {
        // Llama a la función del servicio para autenticar al médico
        const resultados = await autenticarMedico( usuario, contrasenia );

        if (resultados.length > 0) {
            // El usuario y la contraseña son correctos
            res.redirect('/main'); // Llama a la página principal
        } else {
            // Credenciales incorrectas
            res.send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).send('Error en la base de datos');
    }
});


module.exports = router; // Exportamos el router
