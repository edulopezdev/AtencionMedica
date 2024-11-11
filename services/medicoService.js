const conexion = require('../config/db');

const obtenerEspecialidades = () => {
    return new Promise((resolve, reject) => {
        const queryEspecialidades = 'SELECT * FROM especialidad';
        conexion.query(queryEspecialidades, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados); //Devuelve todas las especialidades disponibles
        });
    });
};

//Función para obtener todos los médicos registrados
const obtenerMedicos = () => {
    return new Promise((resolve, reject) => {
        const queryMedicos = 'SELECT * FROM medico';
        conexion.query(queryMedicos, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados); //Devuelve todos los médicos registrados
        });
    });
};

//Función para obtener las relaciones entre médicos y especialidades
const obtenerMedicosEspecialidad = () => {
    return new Promise((resolve, reject) => {
        const queryMedicosEspecialidad = 'SELECT * FROM medico_especialidad';
        conexion.query(queryMedicosEspecialidad, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados); //Devuelve las relaciones entre médicos y especialidades
        });
    });
};

module.exports = {
    obtenerEspecialidades, //Exporta la función para obtener especialidades
    obtenerMedicos, //Exporta la función para obtener médicos
    obtenerMedicosEspecialidad, //Exporta la función para obtener las relaciones médico-especialidad
};
