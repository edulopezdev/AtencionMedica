const conexion = require('../config/db');  //Importamos la configuración de la conexión a la base de datos

//Función para obtener los turnos del día para un médico específico (por matrícula)
const turnosHoyMatricula = (matriculaMedico) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT t.*, p.nombre, p.apellido
            FROM turno t
            JOIN paciente p ON t.dni_paciente = p.dni_paciente
            WHERE t.fecha = CURDATE() AND t.matricula_medico = ?;
        `;
        conexion.query(query, [matriculaMedico], (error, resultado) => {
            if (error) {
                console.error("Error en la consulta:", error); //Si ocurre un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado
        });
    });
};

//Función para obtener los turnos de un médico en una fecha específica
const turnosXFechaYMatricula = (fecha, matriculaMedico) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT t.*, p.nombre, p.apellido
            FROM turno t
            JOIN paciente p ON t.dni_paciente = p.dni_paciente
            WHERE t.fecha = ? AND t.matricula_medico = ?;
        `;
        conexion.query(query, [fecha, matriculaMedico], (error, resultado) => {
            if (error) {
                console.error("Error en la consulta:", error); //Si hay un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado
        });
    });
};

//Función para obtener los datos de un turno específico
const datosTurno = (numero_turno) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
            FROM paciente p
            JOIN turno t ON p.dni_paciente = t.dni_paciente
            WHERE t.numero_turno = ?;
        `;
        //Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [numero_turno], (error, resultado) => {
            if (error) {
                return reject(error); //Si ocurre un error, rechazamos la promesa
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con los datos del paciente
        });
    });
};

//Función para cambiar el estado de un turno a "Atendido"
const cambiarEstadoTurnoAtendido = (numero_turno) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE turno
            SET estado = 'Atendido'
            WHERE numero_turno = ?;
        `;
        
        conexion.query(query, [numero_turno], (error, resultado) => {
            if (error) {
                console.error("Error al actualizar el estado del turno a 'atendido':", error); //Si ocurre un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado de la actualización
        });
    });
};

//Función para cambiar el estado de un turno a "Cancelado"
const cambiarEstadoTurnoCancelado = (numero_turno) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE turno
            SET estado = 'Cancelado'
            WHERE numero_turno = ?;
        `;
        
        conexion.query(query, [numero_turno], (error, resultado) => {
            if (error) {
                console.error("Error al actualizar el estado del turno a 'cancelado':", error); //Si ocurre un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado de la actualización
        });
    });
};

//Función para listar todas las plantillas existentes
const listarTemplates = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM templates;`;
        
        conexion.query(query, (error, resultado) => {
            if (error) {
                console.error("Error al obtener templates:", error); //Si ocurre un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado
        });
    });
};

//Función para crear una nueva plantilla
const crearTemplate = (nombre, contenido) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO templates (nombre_template, contenido_template) VALUES (?, ?);`;
        
        conexion.query(query, [nombre, contenido], (error, resultado) => {
            if (error) {
                console.error("Error al crear template:", error); //Si ocurre un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado de la inserción
        });
    });
};

//Función para listar todos los medicamentos disponibles
const listarMedicamentos = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM medicamento;`;
        
        conexion.query(query, (error, resultado) => {
            if (error) {
                console.error("Error al obtener medicamento:", error); //Si ocurre un error, lo mostramos en la consola
                return reject(error); //Rechazamos la promesa con el error
            }
            resolve(resultado); //Si la consulta es exitosa, resolvemos la promesa con el resultado
        });
    });
};

//Exportamos las funciones para poder usarlas en otros archivos
module.exports = {
    turnosHoyMatricula,
    datosTurno,
    turnosXFechaYMatricula,
    listarTemplates,
    cambiarEstadoTurnoAtendido,
    cambiarEstadoTurnoCancelado,
    listarMedicamentos,
    crearTemplate,
};
