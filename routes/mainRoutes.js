// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerEspecialidades, obtenerMedicos, obtenerMedicosEspecialidad } = require('../services/dbService'); // Importamos las funciones de dbService


// Ruta para la página de inicio
router.get('/index', (req, res) => {
    res.render('index'); // Renderiza la vista de la página de inicio
});



// Definimos la ruta "/main"
router.get('/main', (req, res) => {
    // Llamamos a las funciones de dbService para obtener datos
    Promise.all([obtenerEspecialidades(), obtenerMedicos(), obtenerMedicosEspecialidad()])
        .then(([especialidades, medicos, medicoEspecialidad]) => {
            res.render('index', { especialidades, medicos, medicoEspecialidad }); // Enviamos datos a la vista
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
});

module.exports = router; // Exportamos las rutas para usarlas en app.js
