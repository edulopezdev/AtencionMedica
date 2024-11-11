const conexion = require('../config/db');
const bcrypt = require('bcrypt');

const autenticarMedico = (usuario, contrasenia) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM medico WHERE matricula_medico = ?';
        conexion.query(query, [usuario], async (error, resultados) => {
            if (error) return reject(error);
            //Si se encontró un médico con esa matrícula
            if (resultados.length > 0) {
                const medico = resultados[0];
                //Compara la contraseña proporcionada con el hash almacenado en la base de datos
                const coinciden = await bcrypt.compare(contrasenia, medico.password);
                if (coinciden) {
                    resolve(resultados); //Autenticación exitosa
                } else {
                    resolve([]); //Contraseña incorrecta
                }
            } else {
                resolve([]); //No se encontró ningún médico con esa matrícula
            }
        });
    });
};

//Función para obtener los detalles del médico que está logueado
const obtenerMedicoLogueado = (matricula) => {
    return new Promise((resolve, reject) => {
        const queryMedicos = 'SELECT * FROM medico where matricula_medico = ?';
        conexion.query(queryMedicos, [matricula], (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados); //Devuelve los datos del médico logueado
        });
    });
};

module.exports = {
    autenticarMedico, //Exporta la función para autenticar al médico
    obtenerMedicoLogueado, //Exporta la función para obtener los datos del médico logueado
};
