const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController'); // Importamos el controlador
const authController = require('../controllers/authController'); // Importamos el controlador

// Ruta para la página de inicio
router.get('/index', authController.authMiddleware,  (req, res) => {
    res.render('index');
});

// Ruta para la página de agenda
router.get('/agenda',  authController.authMiddleware,  (req, res) => {
    res.render('agenda'); // Renderiza agenda
});

// Ruta para la página de hce
router.get('/hce',   authController.authMiddleware, (req, res) => {
    res.render('hce'); // Renderiza hce
});

// Ruta para la página de perfil
router.get('/profile',   authController.authMiddleware,  (req, res) => {
    res.render('profile'); // Renderiza profile
});

// Ruta para la página de configuración
router.get('/settings',   authController.authMiddleware,  (req, res) => {
    res.render('settings'); // Renderiza configuración
});

// Ruta para la página de consultas
router.get('/consulta',   authController.authMiddleware, (req, res) => {
    res.render('consulta');
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    res.render('index', { showLogoutModal: true }); // Redirigir a la página de inicio con el modal de confirmación
});

// Ruta "/main"
router.get('/getMain',  authController.authMiddleware,  consultaController.getMain);

// Ruta para manejar la consulta de fecha
router.post('/procesar-fecha',   authController.authMiddleware, consultaController.procesarFechaConsulta);

// Ruta para obtener turnos por fecha
router.get('/turnos/:fecha',   authController.authMiddleware, consultaController.obtenerTurnosPorFecha);

// Ruta para obtener consulta por número de turno
router.get('/getConsulta',   authController.authMiddleware, consultaController.iniciarConsultaPorNumero);

module.exports = router;
