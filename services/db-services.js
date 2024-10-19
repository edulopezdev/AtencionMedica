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

// Función para obtener médicos
const obtenerMedicoLogueado = ( user ) => {
    return new Promise((resolve, reject) => {
        const queryMedicos = 'SELECT * FROM medico where matricula_medico = ?';
        conexion.query(queryMedicos, [user], (error, resultados) => {
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

// Función para procesar la fecha (por ejemplo, guardar en la base de datos)
const procesarFecha = ( fecha = new Date().toISOString().slice(0, 10) ) => {
    return new Promise(( resolve, reject ) => {
        // Aquí puedes hacer una operación, como insertar en la base de datos
        const query = 'SELECT * FROM turno where fecha = ?';
        conexion.query( query, [fecha], ( error, resultado ) => {
            if ( error ) {
                return reject( error );
            }
            resolve( resultado );
        });
    });
};

const iniciarConsulta = ( numero_turno ) => { //datos del paciente y su turno
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


// Exporta las funciones
module.exports = {
    obtenerEspecialidades,
    obtenerMedicos,
    obtenerMedicosEspecialidad,
    autenticarMedico,
    procesarFecha,
    iniciarConsulta,
    obtenerMedicoLogueado,
};