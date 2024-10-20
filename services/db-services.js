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
const procesarFecha = (fecha = new Date().toISOString().slice(0, 10)) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT t.*, p.nombre, p.apellido
            FROM turno t
            JOIN paciente p ON t.dni_paciente = p.dni_paciente
            WHERE t.fecha = ?;
        `;
        conexion.query(query, [fecha], (error, resultado) => {
            if (error) {
                console.error("Error en la consulta:", error);
                return reject(error);
            }
            resolve(resultado);
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


const ultimaConsultaPorDni = ( dni ) => { //datos del paciente y su turno
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
    t.dni_paciente = 11234567
ORDER BY 
    t.fecha DESC;
        `;
        
        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [dni], (error, resultado) => {
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
    ultimaConsultaPorDni,

};