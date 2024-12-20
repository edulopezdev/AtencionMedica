const conexion = require('../config/db');

//Ultima consulta por numero de dni
const ultimaConsultaPorNumeroDni = (dni) => { //datos completos del ultimo turno del paciente
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
    a.*,
    an.*,
    d.*,
    e.*,
    h.*,
    t.*
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
    (SELECT CONCAT(nombre, ' ', apellido) FROM paciente WHERE dni_paciente = t.dni_paciente LIMIT 1) AS nombre_paciente,
    (SELECT nombre_alergia FROM alergia WHERE numero_turno = t.numero_turno LIMIT 1) AS nombre_alergia,
    (SELECT descripcion_antecedente FROM antecedente WHERE numero_turno = t.numero_turno LIMIT 1) AS descripcion_antecedente,
    (SELECT resumen_diagnostico FROM diagnostico WHERE numero_turno = t.numero_turno LIMIT 1) AS resumen_diagnostico,
    (SELECT resumen_evolucion FROM evolucion WHERE numero_turno = t.numero_turno LIMIT 1) AS resumen_evolucion,
    (SELECT descripcion_habito FROM habito WHERE numero_turno = t.numero_turno LIMIT 1) AS descripcion_habito,
    (SELECT CONCAT(nombre, ' ', apellido) FROM medico WHERE matricula_medico = t.matricula_medico LIMIT 1) AS profesional,
    t.fecha,
    t.dni_paciente,
    t.matricula_medico,
    t.motivo_consulta,
    t.numero_turno
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
            // console.log('metodo ' + resultado)
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
    //console.log(datos); //Log para depurar
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
            if (datos.nombre_alergia && datos.importancia_alergia && datos.fecha_desde_alergia  ) {
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

const modificarConsultaCompleta = (datos) => {
    // console.log(datos);
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

            // Inserta en la tabla alergia si los datos están presentes // solo update
            // if (datos.nombre_alergia && datos.importancia_alergia && datos.fecha_desde_alergia ) {
            //     const queryAlergia = `
            //         UPDATE alergia
            //             SET nombre_alergia = ?, 
            //                 importancia = ?, 
            //                 fecha_desde = ?, 
            //                 fecha_hasta = ?
            //             WHERE numero_turno = ?;

            //     `;
            //     const paramsAlergia = [datos.nombre_alergia, datos.importancia_alergia, datos.fecha_desde_alergia, datos.fecha_hasta_alergia, datos.numero_turno];

            //     conexion.query(queryAlergia, paramsAlergia, (error) => {
            //         if (error) return conexion.rollback(() => reject(error));
            //     });
            // }

            //Alergia
             // Alergia: Verifica si existe y luego decide entre UPDATE o INSERT
            if (datos.nombre_alergia && datos.importancia_alergia && datos.fecha_desde_alergia) {
                const queryVerificarAlergia = `SELECT COUNT(*) AS count FROM alergia WHERE numero_turno = ?`;
                conexion.query(queryVerificarAlergia, [datos.numero_turno], (error, results) => {
                    if (error) return conexion.rollback(() => reject(error));

                    const existeAlergia = results[0].count > 0;
                    const queryAlergia = existeAlergia
                        ? `UPDATE alergia SET nombre_alergia = ?, importancia = ?, fecha_desde = ?, fecha_hasta = ? WHERE numero_turno = ?`
                        : `INSERT INTO alergia (nombre_alergia, importancia, fecha_desde, fecha_hasta, numero_turno) VALUES (?, ?, ?, ?, ?)`;
                    const paramsAlergia = [datos.nombre_alergia, datos.importancia_alergia, datos.fecha_desde_alergia, datos.fecha_hasta_alergia, datos.numero_turno];

                    conexion.query(queryAlergia, paramsAlergia, (error) => {
                        if (error) return conexion.rollback(() => reject(error));
                    });
                });
            }

            // Inserta en la tabla antecedente si los datos están presentes // solo update
            // if (datos.descripcion_antecedente && datos.fecha_desde_antecedente ) {
            //     const queryAntecedente = `
            //         UPDATE antecedente
            //             SET descripcion_antecedente = ?, 
            //                 fecha_desde = ?, 
            //                 fecha_hasta = ?
            //             WHERE numero_turno = ?;

            //     `;
            //     const paramsAntecedente = [datos.descripcion_antecedente, datos.fecha_desde_antecedente, datos.fecha_hasta_antecedente, datos.numero_turno];

            //     conexion.query(queryAntecedente, paramsAntecedente, (error) => {
            //         if (error) return conexion.rollback(() => reject(error));
            //     });
            // }
            //Antecedentes
            if (datos.descripcion_antecedente && datos.fecha_desde_antecedente) {
                const queryVerificarAntecedente = `SELECT COUNT(*) AS count FROM antecedente WHERE numero_turno = ?`;
                conexion.query(queryVerificarAntecedente, [datos.numero_turno], (error, results) => {
                    if (error) return conexion.rollback(() => reject(error));
            
                    const existeAntecedente = results[0].count > 0;
                    const queryAntecedente = existeAntecedente
                        ? `UPDATE antecedente SET descripcion_antecedente = ?, fecha_desde = ?, fecha_hasta = ? WHERE numero_turno = ?`
                        : `INSERT INTO antecedente (descripcion_antecedente, fecha_desde, fecha_hasta, numero_turno) VALUES (?, ?, ?, ?)`;
                    const paramsAntecedente = [datos.descripcion_antecedente, datos.fecha_desde_antecedente, datos.fecha_hasta_antecedente, datos.numero_turno];
            
                    conexion.query(queryAntecedente, paramsAntecedente, (error) => {
                        if (error) return conexion.rollback(() => reject(error));
                    });
                });
            }
            
            // Inserta múltiples registros en la tabla diagnostico si existen en el array
            datos.diagnosticosArray.forEach(diagnostico => {
                const queryDiagnostico = `
                    UPDATE diagnostico
                        SET resumen_diagnostico = ?, 
                            estado = ?
                        WHERE numero_turno = ?;

                `;
                const paramsDiagnostico = [diagnostico.diagnostico, diagnostico.estado, datos.numero_turno];

                conexion.query(queryDiagnostico, paramsDiagnostico, (error) => {
                    if (error) return conexion.rollback(() => reject(error));
                });
            });

            // Inserta en la tabla evolucion
            const queryEvolucion = `
                UPDATE evolucion
                    SET resumen_evolucion = ?
                    WHERE numero_turno = ?;

            `;
            const paramsEvolucion = [datos.resumen_evolucion, datos.numero_turno];

            conexion.query(queryEvolucion, paramsEvolucion, (error) => {
                if (error) return conexion.rollback(() => reject(error));

                // Inserta en la tabla habito si los datos están presentes
                // if (datos.descripcion_habito && datos.fecha_desde_habito ) {
                //     const queryHabito = `
                //         UPDATE habito
                //             SET descripcion_habito = ?, 
                //                 fecha_desde = ?, 
                //                 fecha_hasta = ?
                //             WHERE numero_turno = ?;

                //     `;
                //     const paramsHabito = [datos.descripcion_habito, datos.fecha_desde_habito, datos.fecha_hasta_habito, datos.numero_turno];

                //     conexion.query(queryHabito, paramsHabito, (error) => {
                //         if (error) return conexion.rollback(() => reject(error));
                //     });
                // }
                    //Habito
                    if (datos.descripcion_habito && datos.fecha_desde_habito) {
                        const queryVerificarHabito = `SELECT COUNT(*) AS count FROM habito WHERE numero_turno = ?`;
                        conexion.query(queryVerificarHabito, [datos.numero_turno], (error, results) => {
                            if (error) return conexion.rollback(() => reject(error));
                    
                            const existeHabito = results[0].count > 0;
                            const queryHabito = existeHabito
                                ? `UPDATE habito SET descripcion_habito = ?, fecha_desde = ?, fecha_hasta = ? WHERE numero_turno = ?`
                                : `INSERT INTO habito (descripcion_habito, fecha_desde, fecha_hasta, numero_turno) VALUES (?, ?, ?, ?)`;
                            const paramsHabito = [datos.descripcion_habito, datos.fecha_desde_habito, datos.fecha_hasta_habito, datos.numero_turno];
                    
                            conexion.query(queryHabito, paramsHabito, (error) => {
                                if (error) return conexion.rollback(() => reject(error));
                            });
                        });
                    }
                    

                // Inserta en la tabla receta si hay un medicamento seleccionado
                // 
                //Receta
                if (datos.id_medicamento) {
                    const queryVerificarReceta = `SELECT COUNT(*) AS count FROM receta WHERE numero_turno = ? AND id_receta = ?`;
                    conexion.query(queryVerificarReceta, [datos.numero_turno, datos.id_receta], (error, results) => {
                        if (error) return conexion.rollback(() => reject(error));
                
                        const existeReceta = results[0].count > 0;
                        const queryReceta = existeReceta
                            ? `UPDATE receta SET id_medicamento = ? WHERE numero_turno = ? AND id_receta = ?`
                            : `INSERT INTO receta (id_medicamento, numero_turno, id_receta) VALUES (?, ?, ?)`;
                        const paramsReceta = existeReceta
                            ? [datos.id_medicamento, datos.numero_turno, datos.id_receta]
                            : [datos.id_medicamento, datos.numero_turno, datos.id_receta];
                
                        conexion.query(queryReceta, paramsReceta, (error) => {
                            if (error) return conexion.rollback(() => reject(error));
                
                            // Si todo ha ido bien, confirma la transacción
                            conexion.commit((err) => {
                                if (err) return conexion.rollback(() => reject(err));
                                resolve('Datos actualizados correctamente');
                            });
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

//Consulta por numero de turno
const consultaPorNumeroTurno = (turno) => { //datos completos del ultimo turno del paciente
    return new Promise((resolve, reject) => {
        const query = `
        SELECT 
    a.nombre_alergia, a.importancia, a.fecha_desde AS aler_desde, a.fecha_hasta AS aler_hasta,
    an.descripcion_antecedente, an.fecha_desde AS ant_desde, an.fecha_hasta AS ant_hasta,
    d.resumen_diagnostico, d.estado AS diag_estado,
    e.resumen_evolucion, 
    h.descripcion_habito, h.fecha_desde AS hab_desde, h.fecha_hasta AS hab_hasta,
    p.dni_paciente, CONCAT(p.nombre, ' ', p.apellido) AS paciente_nombre, p.direccion, p.telefono, p.fecha_nacimiento,
    r.id_medicamento, r.id_receta,
    t.numero_turno, t.fecha, t.hora, t.motivo_consulta, t.estado
FROM 
    turno t
    JOIN paciente p ON t.dni_paciente = p.dni_paciente
    LEFT JOIN alergia a ON t.numero_turno = a.numero_turno
    LEFT JOIN antecedente an ON t.numero_turno = an.numero_turno
    LEFT JOIN diagnostico d ON t.numero_turno = d.numero_turno
    LEFT JOIN evolucion e ON t.numero_turno = e.numero_turno
    LEFT JOIN habito h ON t.numero_turno = h.numero_turno
    LEFT JOIN receta r ON t.numero_turno = r.numero_turno
WHERE 
    t.numero_turno = ?
LIMIT 1;

        `;

        // Asumiendo que tienes acceso a la conexión de la base de datos
        conexion.query(query, [turno], (error, resultado) => {
            if (error) {
                return reject(error);  // En caso de error, se rechaza la promesa
            }
            //console.log( 'metodo ' + resultado)
            resolve(resultado);  // En caso de éxito, se resuelven los datos del paciente
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
    consultaPorNumeroTurno,
    modificarConsultaCompleta,


};
