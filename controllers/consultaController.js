// controllers/consultaController.js
const { turnosHoyMatricula, datosTurno , turnosXFechaYMatricula, listarTemplates } = require('../services/agendaService');
const { ultimaConsultaPorNumeroDni } = require('../services/pacienteService');

// Controlador para la ruta "/getMain" renderizo vista index
const getMain = (req, res) => {
    const matricula_medico = req.session.matricula;
    Promise.all([turnosHoyMatricula(matricula_medico)])
        .then(([turnos]) => {
            const turnosPorHora = {}; // Objeto para almacenar turnos organizados por hora

            // Organiza los turnos por hora
            turnos.forEach(turno => {
                turnosPorHora[turno.hora] = {
                    nombre: turno.nombre,
                    apellido: turno.apellido,
                    motivo_consulta: turno.motivo_consulta || 'Consulta general',
                };
            });

            console.log('Turnos organizados por hora:', turnosPorHora); // Log para depuración

            const nombre = req.session.nombre;
            res.render('index', { turnos: turnosPorHora, nombre });
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
};

// Controlador para obtener turnos por fecha
const obtenerTurnosPorFecha = async (req, res) => {
    const fecha = req.params.fecha;
    console.log( fecha );
    try {
        const turnos = await turnosXFechaYMatricula( fecha, req.session.matricula);
        res.json({ turnos });
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};

// Trae los datos ultima consulta y turno, y renderizo vista consulta
const iniciarConsultaPorNumeroTurno = (req, res) => {
    const { numero_turno } = req.query;

    datosTurno( numero_turno )
        .then((resultado) => {
            if (resultado.length === 0) {
                return res.status(404).send('Turno no encontrado');
            }

            const turno = resultado[0];
            const dni_paciente = turno.dni_paciente;

            // Llama a `ultimaConsultaPorNumeroDni` usando el DNI obtenido
            return Promise.all([
                Promise.resolve( turno ),
                ultimaConsultaPorNumeroDni( dni_paciente ),
                listarTemplates(),
            ]);
        })
        .then(([turno, consultaUltima, templates]) => {
            const ultimoTurno = consultaUltima[0];
            // console.log( templates);
            // console.log( ultimoTurno);
            res.render('consulta', { turno, ultimoTurno, templates });
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
};



// Controlador renderizo index
// const procesarFechaConsulta = (req, res) => {
//     const fechaSeleccionada = req.body.fecha;

//     turnosXFechaYMatricula(fechaSeleccionada, req.session.matricula)
//         .then(resultados => {
//             res.render('index', { turnos: resultados });
//         })
//         .catch(error => {
//             console.error('Error en la consulta:', error);
//             res.status(500).send('Error en la consulta de la base de datos');
//         });
// };

module.exports = {
    getMain,
    //procesarFechaConsulta,
    obtenerTurnosPorFecha,
    iniciarConsultaPorNumeroTurno,
};
