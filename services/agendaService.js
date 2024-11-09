const conexion = require('../config/db'); 


// Función para procesar la fecha (por ejemplo, guardar en la base de datos)
const turnosHoyMatricula = ( matriculaMedico ) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT t.*, p.nombre, p.apellido
            FROM turno t
            JOIN paciente p ON t.dni_paciente = p.dni_paciente
            WHERE t.fecha = CURDATE() AND t.matricula_medico = ?;
        `;
        conexion.query(query, [ matriculaMedico ], (error, resultado) => {
            if (error) {
                console.error("Error en la consulta:", error);
                return reject(error);
            }
            resolve(resultado);
        });
    });
};

// Función para procesar la fecha (por ejemplo, guardar en la base de datos)
const turnosXFechaYMatricula = ( fecha , matriculaMedico ) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT t.*, p.nombre, p.apellido
            FROM turno t
            JOIN paciente p ON t.dni_paciente = p.dni_paciente
            WHERE t.fecha = ? AND t.matricula_medico = ?;
        `;
        conexion.query(query, [fecha, matriculaMedico], (error, resultado) => {
            if (error) {
                console.error("Error en la consulta:", error);
                return reject(error);
            }
            resolve(resultado);
        });
    });
};

const datosTurno = ( numero_turno ) => { //datos del paciente y su turno
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
            FROM paciente p
            JOIN turno t ON p.dni_paciente = t.dni_paciente
            WHERE t.numero_turno = ?;
        `;
        
        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [numero_turno], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            //console.log( 'metodo ' + resultado)
            resolve(resultado);  // En caso de éxito, se resuelven los datos del paciente
        });
    });
};

//Modifica el estado de un turno a atendido
const cambiarEstadoTurnoAtendido = (numero_turno) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE turno
            SET estado = 'Atendido'
            WHERE numero_turno = ?;
        `;
        
        conexion.query(query, [numero_turno], (error, resultado) => {
            if (error) {
                console.error("Error al actualizar el estado del turno a 'atendido':", error);
                return reject(error); // En caso de error, se rechaza la promesa
            }
            resolve(resultado); // En caso de éxito, se resuelve el resultado de la consulta
        });
    });
};

//Modifica el estado de un turno a cancelado
const cambiarEstadoTurnoCancelado = (numero_turno) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE turno
            SET estado = 'Cancelado'
            WHERE numero_turno = ?;
        `;
        
        conexion.query(query, [numero_turno], (error, resultado) => {
            if (error) {
                console.error("Error al actualizar el estado del turno a 'cancelado':", error);
                return reject(error); // En caso de error, se rechaza la promesa
            }
            resolve(resultado); // En caso de éxito, se resuelve el resultado de la consulta
        });
    });
};

//Obtenes las templates y su contenido
const listarTemplates = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM templates;`;
        
        conexion.query(query, (error, resultado) => {
            if (error) {
                console.error("Error al obtener templates:", error);
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            resolve(resultado);  // En caso de éxito, se resuelve el resultado de la consulta
        });
    });
};

const crearTemplate = ( nombre, contenido ) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO templates (nombre_template, contenido_template) VALUES (?, ?);`;
        
        conexion.query(query, [nombre, contenido], (error, resultado) => {
            if (error) {
                console.error("Error al crear template:", error);
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            resolve(resultado);  // En caso de éxito, se resuelve con el resultado de la inserción
        });
    });
};


//Listar medicamentos
const listarMedicamentos = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM medicamento;`;
        
        conexion.query(query, (error, resultado) => {
            if (error) {
                console.error("Error al obtener medicamento:", error);
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            resolve(resultado);  // En caso de éxito, se resuelve el resultado de la consulta
        });
    });
};



//Modificar la ultima atencion del paciente




// Exporta las funciones
module.exports = {
    turnosHoyMatricula,
    datosTurno,
    turnosXFechaYMatricula,
    listarTemplates,
    cambiarEstadoTurnoAtendido,
    cambiarEstadoTurnoCancelado,
    listarMedicamentos,

};