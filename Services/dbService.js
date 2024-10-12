const conexion = require('../config/db'); 


//--------------------consultas DB ------------

// Función para autenticar un médico
const autenticarMedico = ( usuario, contrasenia ) => {
    return new Promise(( resolve, reject ) => {
        const query = 'SELECT * FROM medico WHERE matricula_medico = ? AND password = ?';
        conexion.query( query, [usuario, contrasenia], ( error, resultados ) => {
            if ( error ) return reject( error );
            resolve( resultados );
        });
    });
}

// Función para obtener especialidades
const obtenerEspecialidades = () => {
    return new Promise((resolve, reject) => {
        const queryEspecialidades = 'SELECT * FROM especialidad';
        conexion.query(queryEspecialidades, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
}

// Función para obtener médicos
const obtenerMedicos = () => {
    return new Promise((resolve, reject) => {
        const queryMedicos = 'SELECT * FROM medico';
        conexion.query(queryMedicos, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
}

// Función para obtener relaciones médico-especialidad
const  obtenerMedicosEspecialidad = () => {
    return new Promise((resolve, reject) => {
        const queryMedicosEspecialidad = 'SELECT * FROM medico_especialidad';
        conexion.query(queryMedicosEspecialidad, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
}

// Exporta las funciones
module.exports = {
    obtenerEspecialidades,
    obtenerMedicos,
    obtenerMedicosEspecialidad,
    autenticarMedico,
};