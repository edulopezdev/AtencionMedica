// controllers/consultaController.js
const { turnosHoyMatricula, iniciarConsulta, ultimaConsultaPorNumeroTurno, turnosXFechaYMatricula } = require('../services/agendaService');

// Controlador para la ruta "/getMain"
const getMain = (req, res) => {
    // const usuario = req.query.usuario; // Obtener el usuario de la query string
    const matricula_medico = req.session.matricula;
    Promise.all([ turnosHoyMatricula( matricula_medico ) ])
        .then(([ turnos]) => {
            // const medico = medicoLogueado[0];
            const nombre = req.session.nombre;
            res.render('index', {turnos, nombre });
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
};

// Controlador para manejar la consulta de fecha
const procesarFechaConsulta = (req, res) => {
    const fechaSeleccionada = req.body.fecha;

    procesarFecha(fechaSeleccionada)
        .then(resultados => {
            res.render('index', { turnos: resultados });
        })
        .catch(error => {
            console.error('Error en la consulta:', error);
            res.status(500).send('Error en la consulta de la base de datos');
        });
};

// Controlador para obtener turnos por fecha
const obtenerTurnosPorFecha = async (req, res) => {
    const fecha = req.params.fecha;
    console.log( fecha );
    try {
        const turnos = await procesarFecha(fecha);
        res.json({ turnos });
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};

// Controlador para iniciar consulta por número de turno--Lo llamo en Routes/getConsulta
const iniciarConsultaPorNumero = (req, res) => {
    const { numero_turno } = req.query;

    Promise.all([iniciarConsulta(numero_turno), ultimaConsultaPorNumeroTurno( numero_turno )])
        .then(([resultado, consultaUltima]) => {
            const paciente = resultado[0];
            const ultimoTurno = consultaUltima[0];
            // console.log( ultimoTurno[0] );
            res.render('consulta', { paciente, ultimoTurno });
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
};

module.exports = {
    getMain,
    procesarFechaConsulta,
    obtenerTurnosPorFecha,
    iniciarConsultaPorNumero
};
