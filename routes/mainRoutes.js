const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController'); // Importamos el controlador

// Ruta para la página de inicio
router.get('/index', (req, res) => {
    res.render('index');
});

// Ruta para la página de agenda
router.get('/agenda', (req, res) => {
    res.render('agenda'); // Renderiza agenda
});

// Ruta para la página de hce
router.get('/hce', (req, res) => {
    res.render('hce'); // Renderiza hce
});

// Ruta para la página de perfil
router.get('/profile', (req, res) => {
    res.render('profile'); // Renderiza profile
});

// Ruta para la página de configuración
router.get('/settings', (req, res) => {
    res.render('settings'); // Renderiza configuración
});

// Ruta para la página de consultas
router.get('/consulta', (req, res) => {
    res.render('consulta');
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    res.render('index', { showLogoutModal: true }); // Redirigir a la página de inicio con el modal de confirmación
});

// Ruta "/main"
router.get('/getMain', consultaController.getMain);

// Ruta para manejar la consulta de fecha
router.post('/procesar-fecha', consultaController.procesarFechaConsulta);

// Ruta para obtener turnos por fecha
router.get('/turnos/:fecha', consultaController.obtenerTurnosPorFecha);

// Ruta para obtener consulta por número de turno
router.get('/getConsulta', consultaController.iniciarConsultaPorNumero);

module.exports = router;
