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

//Ultima consulta por numero de dni
const ultimaConsultaPorNumeroDni = ( dni ) => { //datos completos del ultimo turno del paciente
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
    a.nombre_alergia,
    an.descripcion_antecedente,
    d.resumen_diagnostico,
    e.resumen_evolucion,
    h.descripcion_habito,
    t.fecha,
    t.dni_paciente
FROM 
    turno t
LEFT JOIN alergia a ON t.numero_turno = a.numero_turno
LEFT JOIN antecedente an ON t.numero_turno = an.numero_turno
LEFT JOIN diagnostico d ON t.numero_turno = d.numero_turno
LEFT JOIN evolucion e ON t.numero_turno = e.numero_turno
LEFT JOIN habito h ON t.numero_turno = h.numero_turno
WHERE 
    t.dni_paciente = ? and t.estado LIKE 'Atendido'
ORDER BY 
    t.fecha DESC
    LIMIT 1;
        `;
        
        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [ dni], (error, resultado) => {
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

//Todas las consultas de un paciente HCE
const hceXDni = ( dni ) => { //datos completos de todas las consultas
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
    a.nombre_alergia,
    an.descripcion_antecedente,
    d.resumen_diagnostico,
    e.resumen_evolucion,
    h.descripcion_habito,
    t.fecha,
    t.dni_paciente
FROM 
    turno t
LEFT JOIN alergia a ON t.numero_turno = a.numero_turno
LEFT JOIN antecedente an ON t.numero_turno = an.numero_turno
LEFT JOIN diagnostico d ON t.numero_turno = d.numero_turno
LEFT JOIN evolucion e ON t.numero_turno = e.numero_turno
LEFT JOIN habito h ON t.numero_turno = h.numero_turno
WHERE 
    t.dni_paciente = ?
ORDER BY 
    t.fecha DESC;
        `;
        
        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [ dni], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            //console.log( 'metodo ' + resultado)
            resolve(resultado);  // En caso de éxito, se resuelven los datos del paciente
        });
    });
};

//Consultas de un paciente con otros profesionales
const consultasPacienteConOtrosMedicos = ( dni ) => { //consultas con otros profesionales
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            t.fecha,
            t.
            t.motivo_consulta,
    d.resumen_diagnostico,
    t.dni_paciente
FROM 
    turno t
LEFT JOIN diagnostico d ON t.numero_turno = d.numero_turno
LEFT JOIN medico m ON m.matricula_medico = t.matricula_medico
WHERE 
    t.dni_paciente = ?
ORDER BY 
    t.fecha DESC;
        `;
        
        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [ dni], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            //console.log( 'metodo ' + resultado)
            resolve(resultado);  // En caso de éxito, se resuelven los datos del paciente
        });
    });
};

//Modificar la ultima atencion del paciente




// Exporta las funciones
module.exports = {
    turnosHoyMatricula,
    datosTurno,
    ultimaConsultaPorNumeroDni,
    turnosXFechaYMatricula,

};