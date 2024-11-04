const conexion = require('../config/db');

//Ultima consulta por numero de dni
const ultimaConsultaPorNumeroDni = (dni) => { //datos completos del ultimo turno del paciente
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
        conexion.query(query, [dni], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            //console.log( 'metodo ' + resultado)
            resolve(resultado);  // En caso de éxito, se resuelven los datos del paciente
        });
    });
};

//Todas las consultas de un paciente HCE
const hceXDni = (dni) => { //datos completos de todas las consultas
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
    (SELECT nombre_alergia FROM alergia WHERE numero_turno = t.numero_turno LIMIT 1) AS nombre_alergia,
    (SELECT descripcion_antecedente FROM antecedente WHERE numero_turno = t.numero_turno LIMIT 1) AS descripcion_antecedente,
    (SELECT resumen_diagnostico FROM diagnostico WHERE numero_turno = t.numero_turno LIMIT 1) AS resumen_diagnostico,
    (SELECT resumen_evolucion FROM evolucion WHERE numero_turno = t.numero_turno LIMIT 1) AS resumen_evolucion,
    (SELECT descripcion_habito FROM habito WHERE numero_turno = t.numero_turno LIMIT 1) AS descripcion_habito,
    (SELECT CONCAT(nombre, ' ', apellido) FROM medico WHERE matricula_medico = t.matricula_medico LIMIT 1) AS profesional,
    t.fecha,
    t.dni_paciente,
    t.matricula_medico,
    t.motivo_consulta
FROM 
    turno t
WHERE 
    t.dni_paciente = ?
    AND t.estado LIKE 'Atendido' 
ORDER BY 
    t.fecha DESC;
        `;

        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [dni], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            console.log('metodo ' + resultado)
            resolve(resultado);  // En caso de éxito, se resuelven los datos del paciente
        });
    });
};

//Consultas de un paciente con otros profesionales
const consultasPacienteConOtrosMedicos = (dni) => {
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

        conexion.query(query, [dni], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            //console.log( 'metodo ' + resultado)
            resolve(resultado);
        });
    });
};

//Metodo para insertar la consulta completa, abarcando todos los campos
const guardarConsultaCompleta = (datos) => {
    console.log(datos);
    return new Promise((resolve, reject) => {
        // Comienza la transacción
        conexion.beginTransaction((err) => {
            if (err) return reject(err);

            // Actualiza el estado_turno en la tabla turno
            const queryActualizarTurno = `
                UPDATE turno
                SET estado = 'Atendido'
                WHERE numero_turno = ?
            `;
            const paramsActualizarTurno = [datos.numero_turno];

            conexion.query(queryActualizarTurno, paramsActualizarTurno, (error) => {
                if (error) return conexion.rollback(() => reject(error));
            });

            // Inserta en la tabla alergia si los datos están presentes
            if (datos.nombre_alergia && datos.importancia_alergia && datos.fecha_desde_alergia && datos.fecha_hasta_alergia) {
                const queryAlergia = `
                    INSERT INTO alergia (nombre_alergia, importancia, fecha_desde, fecha_hasta, numero_turno)
                    VALUES (?, ?, ?, ?, ?)
                `;
                const paramsAlergia = [datos.nombre_alergia, datos.importancia_alergia, datos.fecha_desde_alergia, datos.fecha_hasta_alergia, datos.numero_turno];

                conexion.query(queryAlergia, paramsAlergia, (error) => {
                    if (error) return conexion.rollback(() => reject(error));
                });
            }

            // Inserta en la tabla antecedente si los datos están presentes
            if (datos.descripcion_antecedente && datos.fecha_desde_antecedente && datos.fecha_hasta_antecedente) {
                const queryAntecedente = `
                    INSERT INTO antecedente (descripcion_antecedente, fecha_desde, fecha_hasta, numero_turno)
                    VALUES (?, ?, ?, ?)
                `;
                const paramsAntecedente = [datos.descripcion_antecedente, datos.fecha_desde_antecedente, datos.fecha_hasta_antecedente, datos.numero_turno];

                conexion.query(queryAntecedente, paramsAntecedente, (error) => {
                    if (error) return conexion.rollback(() => reject(error));
                });
            }

            // Inserta múltiples registros en la tabla diagnostico si existen en el array
            datos.diagnosticosArray.forEach(diagnostico => {
                const queryDiagnostico = `
                    INSERT INTO diagnostico (resumen_diagnostico, estado, numero_turno)
                    VALUES (?, ?, ?)
                `;
                const paramsDiagnostico = [diagnostico.diagnostico, diagnostico.estado, datos.numero_turno];

                conexion.query(queryDiagnostico, paramsDiagnostico, (error) => {
                    if (error) return conexion.rollback(() => reject(error));
                });
            });

            // Inserta en la tabla evolucion
            const queryEvolucion = `
                INSERT INTO evolucion (resumen_evolucion, numero_turno)
                VALUES (?, ?)
            `;
            const paramsEvolucion = [datos.resumen_evolucion, datos.numero_turno];

            conexion.query(queryEvolucion, paramsEvolucion, (error) => {
                if (error) return conexion.rollback(() => reject(error));

                // Inserta en la tabla habito si los datos están presentes
                if (datos.descripcion_habito && datos.fecha_desde_habito && datos.fecha_hasta_habito) {
                    const queryHabito = `
                        INSERT INTO habito (descripcion_habito, fecha_desde, fecha_hasta, numero_turno)
                        VALUES (?, ?, ?, ?)
                    `;
                    const paramsHabito = [datos.descripcion_habito, datos.fecha_desde_habito, datos.fecha_hasta_habito, datos.numero_turno];

                    conexion.query(queryHabito, paramsHabito, (error) => {
                        if (error) return conexion.rollback(() => reject(error));
                    });
                }

                // Inserta en la tabla receta si hay un medicamento seleccionado
                if (datos.id_medicamento) {
                    const queryReceta = `
                        INSERT INTO receta (id_medicamento, numero_turno)
                        VALUES (?, ?)
                    `;
                    const paramsReceta = [datos.id_medicamento, datos.numero_turno];

                    conexion.query(queryReceta, paramsReceta, (error) => {
                        if (error) return conexion.rollback(() => reject(error));

                        // Si todo ha ido bien, confirma la transacción
                        conexion.commit((err) => {
                            if (err) return conexion.rollback(() => reject(err));
                            resolve('Datos actualizados correctamente');
                        });
                    });
                } else {
                    // Si no hay medicamento, confirma la transacción sin insertar en receta
                    conexion.commit((err) => {
                        if (err) return conexion.rollback(() => reject(err));
                        resolve('Datos actualizados correctamente');
                    });
                }
            });
        });
    });
};





//Listar pacientes
const listarPacientes = () => {
    return new Promise((resolve, reject) => {
        const queryPacientes = 'SELECT * FROM paciente';
        conexion.query(queryPacientes, (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
};

//buscar paciente por nombre
const obtenerPacienteXNombre = (nombre) => {
    return new Promise((resolve, reject) => {
        const queryPacientePorNombre = 'SELECT * FROM paciente WHERE nombre like "%?%" or apellido like "%?%"'; // Reemplaza 'paciente' y 'nombre' según el nombre de tu tabla y columna
        conexion.query(queryPacientePorNombre, [nombre], (error, resultados) => {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
};


// Exporta las funciones
module.exports = {
    ultimaConsultaPorNumeroDni,
    hceXDni,
    consultasPacienteConOtrosMedicos,
    guardarConsultaCompleta,
    listarPacientes,
    obtenerPacienteXNombre,

};
