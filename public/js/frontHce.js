document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const buscarButton = document.getElementById('buscarHCE');
    // const resultadosTabla = document.getElementById('tablaResultados');
    let datosPacienteSeleccionado = null;
    const matricula = window.matricula;
    const tablaResultados = document.getElementById('lala');
    // console.log(tablaResultados + 'tabla resultados ');
    console.log(matricula)

    const mostrarResultadosEnDesplegable = (turnos) => {
        // Limpiar resultados anteriores
        const datalist = document.getElementById('pacientes');
        datalist.innerHTML = ''; // Limpiar el datalist

        if (turnos.length === 0) {
            return; // No mostrar nada si no hay resultados
        }

        // Crear opciones dinámicamente
        turnos.forEach(turno => {
            const option = document.createElement('option');
            option.value = `${turno.apellido} ${turno.nombre} dni: ${turno.dni_paciente}`;
            datalist.appendChild(option);
        });
    }

    // Función para realizar la búsqueda en tiempo real
    const buscarPacienteInput = async (query) => {
        try {
            const response = await fetch(`/buscarPacientesPorNombre?query=${encodeURIComponent(query)}`);
            if (response.ok) {
                const turnos = await response.json();

                // Mostrar resultados en el datalist
                mostrarResultadosEnDesplegable(turnos);

                // Guardar el paciente en variable si es único
                if (turnos.length === 1) {
                    datosPacienteSeleccionado = turnos[0];
                    console.log("Datos del paciente único:", datosPacienteSeleccionado);
                }
            } else {
                console.error('Error en la respuesta:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los datos. Inténtalo nuevamenteee.');
        }
    }

    // Evento para el campo de búsqueda (búsqueda en tiempo real)
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query.length > 0) {
            buscarPacienteInput(query);
        } else {
            resultadosTabla.innerHTML = ''; // Limpiar tabla si no hay búsqueda
        }
    });


    //============================================== evento boton ========================



    //Buscar turnos de un paciente para pintar en tabla
    const mostrarTurnosHce = (turnosHistoria) => {
        // Verifica que el elemento con ID 'resultados' no sea null antes de continuar
        const tablaResultados = document.getElementById('resultados');

        if (!tablaResultados) {
            console.error("Elemento con ID 'resultados' no encontrado en el DOM");
            return;
        }

        // Limpia el contenido previo de la tabla antes de agregar nuevos resultados
        tablaResultados.innerHTML = '';

        // Crea el thead de la tabla
        const thead = `
            <tr>
                <th>Fecha</th>
                <th>Profesional</th>
                <th>Alergia</th>
                <th>Antecedente</th>
                <th>Diagnóstico</th>
                <th>Evolución</th>
                <th>Hábito</th>
            </tr>
        `;
        tablaResultados.innerHTML = `<thead>${thead}</thead>`;

        // Crea el tbody
        const tbody = document.createElement('tbody');

        // Recorre los turnos y crea filas para la tabla
        turnosHistoria.forEach(turno => {
            const fila = document.createElement('tr');
            // console.log( turno.matricula_medico + 'matricula peidod')
            // Verifica si la matrícula del turno coincide con la matrícula actual
            const esMismoMedico = turno.matricula_medico == matricula;

            // Crea las celdas (td) con los datos correspondientes o "Privado" si no es el mismo médico
            fila.innerHTML = `
                <td>${ turno.fecha }</td>
                <td>${ turno.profesional }</td>
                <td>${ turno.motivo_consulta }</td>
                <td>${esMismoMedico ? (turno.nombre_alergia || 'N/A') : 'Privado'}</td>
                <td>${esMismoMedico ? (turno.descripcion_antecedente || 'N/A') : 'Privado'}</td>
                <td>${ turno.resumen_diagnostico }</td>
                <td>${esMismoMedico ? (turno.resumen_evolucion || 'N/A') : 'Privado'}</td>
                <td>${esMismoMedico ? (turno.descripcion_habito || 'N/A') : 'Privado'}</td>
            `;

            // Añade la fila al tbody
            tbody.appendChild(fila);
        });

        // Añade el tbody a la tablaResultados
        tablaResultados.appendChild(tbody);
    }





    //Evento del boton de busqueda de HCE, todos los turnos del paciente por dni
    buscarButton.addEventListener('click', async () => {
        const dni = searchInput.value.substring(searchInput.value.length - 8, searchInput.value.length) * 1;
        console.log(dni)

        const tablaResultados = document.getElementById('resultados');
        tablaResultados.innerHTML = ''; // Limpia el contenido de la tabla

        try {
            const response = await fetch(`/buscarHcePacientePorDni?dni=${dni}`);

            if (response.ok) {
                const turnos = await response.json();
                console.log(turnos);  // Puedes usar esta línea para verificar los turnos obtenidos

                mostrarTurnosHce(turnos);
            } else {
                console.error('Error en la respuesta: ', response.statusText);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los datos. Inténtalo nuevamente.');
        }
    });

});


// Función para realizar la búsqueda específica con el botón "Buscar HCE"
// const buscarHCE = async( dniPaciente ) => {
//     console.log(dniPaciente + ' buscar hce');
//     try {
//         const response = await fetch(`/buscarHcePacientePorDni?dni=${encodeURIComponent(dniPaciente)}`);
//         if (response.ok) {
//             const turnosHistoria = await response.json();
//             console.log(turnosHistoria);
//             mostrarTurnosHce( turnosHistoria );
//         } else {
//             console.error('Error en la respuesta:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error al buscar HCE:', error);
//         alert('Hubo un problema al buscar los datos. Inténtalo nuevamente.');
//     }
// }