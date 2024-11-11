const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController'); //Importamos el controlador para manejar las consultas
const authController = require('../controllers/authController'); //Importamos el controlador para manejar la autenticación

//Ruta para la página de index ========================================================
router.get('/index', authController.authMiddleware, (req, res) => {
    res.render('index', { nombre: req.session.nombre }); //Renderiza la página principal, pasando el nombre del usuario desde la sesión
});
router.get('/getMain', authController.authMiddleware, consultaController.getMain);

//Ruta para la página de agenda =======================================================
router.get('/agenda', authController.authMiddleware, (req, res) => {
    res.render('agenda'); //Renderiza la página de agenda
});

//Ruta para la página de HCE (Historia Clínica Electrónica) =========================
router.get('/hce', authController.authMiddleware, (req, res) => {
    const matricula = req.session.matricula;
    //console.log(matricula + 'routes'); //Mostrar matrícula del profesional en la consola //Log para depurar
    res.render('hce', { matricula }); //Renderiza la página HCE, pasando la matrícula
});

router.get('/cargarHceDni/:dni?', authController.authMiddleware, (req, res) => {
    const dni = req.query.dni; //Obtiene el DNI de los parámetros de la URL
    res.render('hce', { matricula: req.session.matricula, dni }); //Pasa el DNI al template
});

router.get('/buscarPacientesPorNombre', authController.authMiddleware, consultaController.obtenerPacientesPorNombre );
router.get('/buscarHcePacientePorDni', authController.authMiddleware, consultaController.obtenerHcePorDni );
router.get('/buscarHcePacientePorDniEspecifico', authController.authMiddleware, consultaController.obtenerHcePorDniEspecifico );

//Ruta para la página de consultas =======================================================
router.get('/consulta', authController.authMiddleware, (req, res) => {
    res.render('consulta', { medico: req.session.nombre }); //Renderiza la página de consulta, pasando el nombre del médico
});
router.get('/getConsulta', authController.authMiddleware, consultaController.iniciarConsultaPorNumeroTurno);
router.get('/ampliarConsulta', authController.authMiddleware, consultaController.iniciarConsultaPorNumeroTurno );
router.get('/editarConsulta', authController.authMiddleware, consultaController.iniciarConsultaPorNumeroTurno );

//Ruta para la página de perfil ========================================================
router.get('/profile', authController.authMiddleware, (req, res) => {
    res.render('profile'); //Renderiza la página de perfil del usuario
});

//Ruta para la página de configuración ========================================================
router.get('/settings', authController.authMiddleware, (req, res) => {
    res.render('settings'); //Renderiza la página de configuración
});

//Ruta para cerrar sesión ===============================================================
router.post('/logout', (req, res) => {
    res.render('index', { showLogoutModal: true }); //Redirige a la página principal con el modal de confirmación de cierre de sesión
});

//Templates ========================================================================
router.get('/nuevaTemplate', authController.authMiddleware, (req, res) => {
    res.render('nuevaTemplate'); //Renderiza la página para crear un nuevo template
});
router.post('/crearTemplate', authController.authMiddleware, consultaController.nuevaTemplate);

//Ruta para manejar la consulta de fecha (comentada, puede ser utilizada más adelante)
//router.post('/procesar-fecha', authController.authMiddleware, consultaController.procesarFechaConsulta);

//Ruta para obtener turnos por fecha, llamado desde el front de consulta
router.get('/turnos/:fecha', authController.authMiddleware, consultaController.obtenerTurnosPorFecha);

//Ruta para guardar una nueva consulta
router.post('/guardarConsulta', authController.authMiddleware, consultaController.guardarConsulta);

//Ruta para modificar una consulta existente
router.post('/modificarConsulta', authController.authMiddleware, consultaController.modificarConsulta);

module.exports = router; //Exportamos el router para que pueda ser usado en otros archivos
