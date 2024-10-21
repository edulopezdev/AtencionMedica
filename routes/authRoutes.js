// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importamos el controlador


//Probando autenticacion


// Ruta para la página de inicio de sesión
router.get('/login', authController.getLogin); 

// Ruta para redirigir a la página de inicio de sesión desde "/"
router.get('/', authController.redirectLogin);

// Ruta para manejar la autenticación
router.post('/login', authController.postLogin); 

// Ruta para cerrar sesión
router.post('/logout', authController.logout); // Llama al método logout

module.exports = router; // Exportamos el router
