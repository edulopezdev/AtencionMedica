// controllers/consultaController.js
const { procesarFecha, iniciarConsulta, obtenerMedicoLogueado, ultimaConsultaPorNumeroTurno } = require('../services/db-services');

// Controlador para la ruta "/getMain"
const getMain = (req, res) => {
    const usuario = req.query.usuario; // Obtener el usuario de la query string
    Promise.all([ procesarFecha(), obtenerMedicoLogueado( usuario ) ])
        .then(([ turnos, medicoLogueado ]) => {
            const medico = medicoLogueado[0];
            res.render('index', {turnos, medico });
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
