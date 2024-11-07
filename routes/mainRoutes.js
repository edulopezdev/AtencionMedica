const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController'); // Importamos el controlador
const authController = require('../controllers/authController'); // Importamos el controlador

// Ruta para la página de index ========================================================
router.get('/index', authController.authMiddleware,  (req, res) => {
    res.render('index', { nombre: req.session.nombre });
});
router.get('/getMain',  authController.authMiddleware,  consultaController.getMain);

// Ruta para la página de agenda =======================================================
router.get('/agenda',  authController.authMiddleware,  (req, res) => {
    res.render('agenda'); // Renderiza agenda
});

// Ruta para la página de hce =========================================================
router.get('/hce',   authController.authMiddleware, (req, res) => {
    const matricula = req.session.matricula;
    console.log(matricula + 'routes')
    res.render('hce', { matricula }); // Renderiza hce
});

router.get('/cargarHceDni/:dni?', authController.authMiddleware, (req, res) => {
    const dni = req.query.dni; // Obtiene el DNI de los parámetros de la URL
    res.render('hce', { matricula: req.session.matricula, dni }); // Pasa el DNI al template
});

router.get('/buscarPacientesPorNombre',  authController.authMiddleware,  consultaController.obtenerPacientesPorNombre );
router.get('/buscarHcePacientePorDni',  authController.authMiddleware,  consultaController.obtenerHcePorDni );
router.get('/buscarHcePacientePorDniEspecifico',  authController.authMiddleware,  consultaController.obtenerHcePorDniEspecifico );

// Ruta para la página de consultas =======================================================

router.get('/consulta',   authController.authMiddleware, (req, res) => {
    res.render('consulta', { medico: req.session.nombre }); // Renderiza consultas
});
router.get('/getConsulta',   authController.authMiddleware, consultaController.iniciarConsultaPorNumeroTurno);
router.get('/ampliarConsulta',  authController.authMiddleware,  consultaController.iniciarConsultaPorNumeroTurno );
router.get('/editarConsulta',  authController.authMiddleware,  consultaController.iniciarConsultaPorNumeroTurno );


// Ruta para la página de perfil =========================================================
router.get('/profile',   authController.authMiddleware,  (req, res) => {
    res.render('profile'); // Renderiza profile
});

// Ruta para la página de configuración ========================================================
router.get('/settings',   authController.authMiddleware,  (req, res) => {
    res.render('settings'); // Renderiza configuración
});


// Ruta para cerrar sesión ===============================================================
router.post('/logout', (req, res) => {
    res.render('index', { showLogoutModal: true }); // Redirigir a la página de inicio con el modal de confirmación
});

// Ruta "/main" renderiza la vista "index" 

// Ruta para manejar la consulta de fecha
//router.post('/procesar-fecha',   authController.authMiddleware, consultaController.procesarFechaConsulta);

// Ruta para obtener turnos por fecha //llamado del front de consulta
router.get('/turnos/:fecha',   authController.authMiddleware, consultaController.obtenerTurnosPorFecha);

// Ruta para obtener consulta por número de turno

router.post('/guardarConsulta',   authController.authMiddleware, consultaController.guardarConsulta);
router.post('/modificarConsulta',   authController.authMiddleware, consultaController.modificarConsulta);

module.exports = router;
