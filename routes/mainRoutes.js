// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerEspecialidades, obtenerMedicos, obtenerMedicosEspecialidad, procesarFecha, iniciarConsulta } = require('../services/db-services'); // Importamos las funciones de dbService

// Ruta para la página de inicio
router.get('/index', (req, res) => {
    res.render('index'); // Renderiza la vista de la página de inicio
});

// Ruta para la página de agenda
router.get('/agenda', (req, res) => {
    res.render('agenda'); // Renderiza agenda
});

// Ruta para la página de consultas
router.get('/consulta', (req, res) => {
    res.render('consulta'); // Renderiza consulta
});

// Definimos la ruta "/main"
router.get('/getMain', (req, res) => {
    // Llamamos a las funciones de dbService para obtener datos
    Promise.all([obtenerEspecialidades(), obtenerMedicos(), obtenerMedicosEspecialidad(), procesarFecha()])
        .then(([especialidades, medicos, medicoEspecialidad, turnos]) => {
            res.render('index', { especialidades, medicos, medicoEspecialidad, turnos }); // Enviamos datos a la vista
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
});

// Ruta para manejar la consulta de fecha y mostrar los resultados en Pug
router.post('/procesar-fecha', (req, res) => {
    const fechaSeleccionada = req.body.fecha; // Asumimos que 'fecha' viene del formulario

    // Llamar a la función para procesar la fecha
    procesarFecha(fechaSeleccionada)
        .then(resultados => {
            // Renderizar la vista de Pug y pasar los resultados
            res.render('index', { turnos: resultados });
        })
        .catch(error => {
            console.error('Error en la consulta:', error);
            res.status(500).send('Error en la consulta de la base de datos');
        });
});

// Ruta para obtener turnos por fecha
router.get('/turnos/:fecha', async (req, res) => {
    const fecha = req.params.fecha;
    try {
        const turnos = await procesarFecha(fecha);
        res.json({ turnos });
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
});

// Generando la carga de consultas, traigo datos de paciente y join con turno
router.get('/getConsulta', (req, res) => {
    const { numero_turno } = req.query; // Obtener el idTurno de la query string

    // Ahora puedes usar idTurno en las consultas si lo necesitas
    Promise.all([iniciarConsulta(numero_turno)])
        .then(([resultado]) => {
            const paciente = resultado[0]; 

            // Formatear la fecha de nacimiento
            const formatDate = (date) => {
                const d = new Date(date);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}-${month}-${year}`;
            };

            if (paciente) {
                paciente.fecha = formatDate(paciente.fecha); // Formatear la fecha
            }

            res.render('consulta', { paciente });
        })
        .catch((error) => {
            console.error('Error en las consultas:', error);
            res.status(500).send('Error en la base de datos');
        });
});

module.exports = router; // Exportamos las rutas para usarlas en app.js
