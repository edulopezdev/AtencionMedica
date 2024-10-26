const conexion = require('../config/db'); 
const bcrypt = require('bcrypt');


const autenticarMedico = (usuario, contrasenia) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM medico WHERE matricula_medico = ?';
        conexion.query(query, [usuario], async (error, resultados) => {
            if (error) return reject(error);
            // Verifica si se encontró un médico
            if (resultados.length > 0) {
                const medico = resultados[0];
                // Compara la contraseña proporcionada con el hash almacenado
                const coinciden = await bcrypt.compare(contrasenia, medico.password);
                if (coinciden) {
                    resolve(resultados);
                } else {
                    resolve([]); // La contraseña no coincide
                }
            } else {
                resolve([]); // No se encontró el médico
            }
        });
    });
};

// Función para obtener médicos
const obtenerMedicoLogueado = ( matricula ) => {
    return new Promise((resolve, reject) => {
        const queryMedicos = 'SELECT * FROM medico where matricula_medico = ?';
        conexion.query(queryMedicos, [matricula], (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
}
// Exporta las funciones
module.exports = {
    autenticarMedico, 
    obtenerMedicoLogueado,
};