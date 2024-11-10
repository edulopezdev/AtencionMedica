// controllers/consultaController.js
const { turnosHoyMatricula, datosTurno, turnosXFechaYMatricula, listarTemplates, listarMedicamentos, crearTemplate } = require('../services/agendaService');
const { ultimaConsultaPorNumeroDni, guardarConsultaCompleta, listarPacientes, hceXDni, consultaPorNumeroTurno, modificarConsultaCompleta } = require('../services/pacienteService');

// Controlador para la ruta "/getMain" renderizo vista index
const getMain = (req, res) => {
    const matricula_medico = req.session.matricula;
    Promise.all([turnosHoyMatricula(matricula_medico)])
        .then(([turnos]) => {
            const turnosPorHora = {}; // Objeto para almacenar turnos organizados por hora

            // Organiza los turnos por hora
            turnos.forEach(turno => {
                // console.log(turno);
                turnosPorHora[turno.hora] = {
                    nombre: turno.nombre,
                    apellido: turno.apellido,
                    numero: turno.numero_turno,
                    estado: turno.estado,
                    motivo_consulta: turno.motivo_consulta || 'Consulta general',
                };
            });

            //console.log('Turnos organizados por hora:', turnosPorHora); // Log para depuración

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
    // console.log( fecha );
    try {
        const turnos = await turnosXFechaYMatricula(fecha, req.session.matricula);
        res.json({ turnos });
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};

// Trae los datos ultima consulta y turno, y renderizo vista consulta
const iniciarConsultaPorNumeroTurno = (req, res) => {
    const { numero_turno } = req.query;
    const { editar } = req.query;
    const medico = req.session.nombre;

    let estado = "nuevo";

    if ( editar === 'true') {
        estado = 'Editar';
    }

    console.log(estado + 'estado al inicio despues de recibir primer parametro');

    // datosTurno(numero_turno)
    consultaPorNumeroTurno( numero_turno )
        .then((resultado) => {
            if (resultado.length === 0) {
                return res.status(404).send('Turno no encontrado');
            }

            // console.log(resultado[0] + 'en back controller')
            const turno = resultado[0];
            const dni_paciente = turno.dni_paciente;

            // Llama a `ultimaConsultaPorNumeroDni` usando el DNI obtenido
            return Promise.all([
                Promise.resolve(turno),
                ultimaConsultaPorNumeroDni(turno.dni_paciente),
                listarTemplates(),
                listarMedicamentos(),
            ]);
        })
        .then(([turno, consultaUltima, templates, medicamentos]) => {
            const ultimoTurno = consultaUltima[0];

            if (turno.estado == 'Atendido' && estado === 'nuevo') {
                estado = 'Atendido';
            } 
            

            console.log( estado + 'estado a la salida del pedido turno');
            // console.log( ultimoTurno );
            res.render('consulta', { turno, ultimoTurno, templates, medicamentos, medico, estado });
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
};


const guardarConsulta = (req, res) => {
    // Extraer los datos del formulario desde `req.body`
    const { numero_turno, evolucion, diagnosticosArray, alergia, antecedentes, habitos, medicamento } = req.body;

    // Construir el objeto de datos para guardar en la base de datos
    const datos = {
        numero_turno,
        // Suponiendo que estos valores son parte de `req.body` o se extraen de alguna manera
        nombre_alergia: alergia.texto, // o la propiedad que tengas en el body
        importancia_alergia: alergia.nivel,
        fecha_desde_alergia: alergia.fechaDesde,
        fecha_hasta_alergia: alergia.fechaHasta,
        descripcion_antecedente: antecedentes.antecedentes, // igual que arriba
        fecha_desde_antecedente: antecedentes.inicioAntecedentes,
        fecha_hasta_antecedente: antecedentes.finAntecedentes,
        diagnosticosArray: diagnosticosArray,
        resumen_evolucion: evolucion,
        descripcion_habito: habitos.habitos,
        fecha_desde_habito: habitos.inicioHabitos,
        fecha_hasta_habito: habitos.finHabitos,
        id_medicamento: medicamento // Suponiendo que es un ID
    };

    // Llamar a la función que guarda la consulta
    guardarConsultaCompleta(datos)
        .then((mensaje) => {
            res.status(200).json({ mensaje });
        })
        .catch((error) => {
            console.error('Error al guardar la consulta:', error);
            res.status(500).json({ error: 'Error al guardar los datos' });
        });
};

//modificar consulta
const modificarConsulta = (req, res) => {
    // Extraer los datos del formulario desde `req.body`
    const { numero_turno, evolucion, diagnosticosArray, alergia, antecedentes, habitos, medicamento , id_receta} = req.body;

    // Construir el objeto de datos para guardar en la base de datos
    const datos = {
        numero_turno,
        // Suponiendo que estos valores son parte de `req.body` o se extraen de alguna manera
        nombre_alergia: alergia.texto, // o la propiedad que tengas en el body
        importancia_alergia: alergia.nivel,
        fecha_desde_alergia: alergia.fechaDesde,
        fecha_hasta_alergia: alergia.fechaHasta,
        descripcion_antecedente: antecedentes.antecedentes, // igual que arriba
        fecha_desde_antecedente: antecedentes.inicioAntecedentes,
        fecha_hasta_antecedente: antecedentes.finAntecedentes,
        diagnosticosArray: diagnosticosArray,
        resumen_evolucion: evolucion,
        descripcion_habito: habitos.habitos,
        fecha_desde_habito: habitos.inicioHabitos,
        fecha_hasta_habito: habitos.finHabitos,
        id_medicamento: medicamento ,// Suponiendo que es un ID
        id_receta: id_receta
    };
    console.log(datos);
    // Llamar a la función que guarda la consulta
    modificarConsultaCompleta(datos)
        .then((mensaje) => {
            res.status(200).json({ mensaje });
        })
        .catch((error) => {
            console.error('Error al guardar la consulta:', error);
            res.status(500).json({ error: 'Error al guardar los datos' });
        });
};

//usada para cargar pacientes en busqueda de hce en vista hce
const obtenerPacientesPorNombre = async (req, res) => {
    try {
        // Ejecuta el servicio `listarPacientesPorDni`
        const query = req.query.query;

        if (!query) {
            return res.status(400).json({ error: 'Falla 404' });
        }

        const pacientes = await listarPacientes(query);

        if (pacientes.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron pacientes con ese Nombre' });
        }

        // Enviar la lista de pacientes como respuesta
        res.status(200).json(pacientes);
    } catch (error) {
        console.error('Error al obtener pacientes por DNI:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerHcePorDni = async (req, res) => {
    try {
        // Ejecuta el servicio `listarPacientesPorDni`
        const dni = req.query.dni;
        // console.log(dni);

        // Verifica si se proporcionó el DNI
        if (!dni) {
            return res.status(400).json({ error: 'DNI no proporcionado' });
        }

        // Llama a la función para obtener el paciente por DNI
        const paciente = await hceXDni(dni);

        // Verifica si se encontró el paciente
        if (paciente.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró paciente con ese DNI' });
        }

        // console.log(paciente); // Asegúrate de utilizar la variable correcta

        // Enviar el paciente como respuesta
        res.status(200).json(paciente);
    } catch (error) {
        console.error('Error al obtener paciente por DNI:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerHcePorDniEspecifico = async (req, res) => {
    const matricula = req.session.matricula;
    try {
        // Obtiene el DNI del parámetro de consulta
        const dni = req.query.dni;

        // Verifica si se proporcionó el DNI
        if (!dni) {
            return res.status(400).json({ error: 'DNI no proporcionado' });
        }

        // Llama a la función para obtener el paciente por DNI
        const paciente = await hceXDni(dni);

        // Verifica si se encontró el paciente
        if (paciente.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró paciente con ese DNI' });
        }
        // console.log( paciente );
        // Renderiza el archivo Pug y envía los datos del paciente
        res.render('hce', { paciente, matricula });
    } catch (error) {
        console.error('Error al obtener paciente por DNI:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const editarUltimaConsulta = async (req, res) => {
    const matricula = req.session.matricula;
    const medico_nombre = req.session.nombre;
    try {
        const dni = req.query.dni;

        if (!dni) {
            return res.status(400).json({ error: 'DNI no proporcionado' });
        }

        // Llama al método obtenerUltimaConsulta para obtener los datos de la última consulta
        const ultimaConsulta = await ultimaConsultaPorNumeroDni(dni);

        if (!ultimaConsulta) {
            return res.status(404).json({ mensaje: 'No se encontró ninguna consulta para el paciente con ese DNI' });
        }

        // Renderiza el formulario Pug para editar la consulta, pasando los datos de la última consulta
        res.render('consulta', { ultimaConsulta, matricula, medico_nombre });
    } catch (error) {
        console.error('Error al editar la última consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const nuevaTemplate = async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud (body)
    const { nombre_template, descripcion_template } = req.body; // Obtener datos del cuerpo de la solicitud
    
    console.log('Datos recibidos:', nombre_template, descripcion_template);

    try {
        // Llamada a la función para crear el template con los datos recibidos
        const resultado = await crearTemplate(nombre_template, descripcion_template);
        
        // Responder con un mensaje de éxito y los datos resultantes
        res.status(201).json({
            message: 'Template creado exitosamente',
            data: resultado
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al crear template:', error);
        res.status(500).json({ message: 'Error al crear el template' });
    }
};



module.exports = {
    getMain,
    //procesarFechaConsulta,
    obtenerTurnosPorFecha,
    iniciarConsultaPorNumeroTurno,
    guardarConsulta,
    obtenerPacientesPorNombre,
    obtenerHcePorDni,
    obtenerHcePorDniEspecifico,
    modificarConsulta,
    nuevaTemplate,

};
