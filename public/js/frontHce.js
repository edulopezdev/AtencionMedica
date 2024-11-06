document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('search');
    const buscarButton = document.getElementById('buscarHCE');
    const resultadosContainer = document.getElementById('resultados'); // Asegúrate que el ID sea correcto
    let datosPacienteSeleccionado = null;
    const matricula = window.matricula; // Verifica que matricula esté definida
    console.log( window.matricula + 'matricula en front');
    const mostrarResultadosEnDesplegable = (turnos) => {
        const datalist = document.getElementById('pacientes');
        datalist.innerHTML = '';

        if (turnos.length === 0) {
            return;
        }

        turnos.forEach(turno => {
            const option = document.createElement('option');
            option.value = `${turno.apellido} ${turno.nombre} DNI: ${turno.dni_paciente}`;
            datalist.appendChild(option);
        });
    }

    const buscarPacienteInput = async (query) => {
        try {
            const response = await fetch(`/buscarPacientesPorNombre?query=${encodeURIComponent(query)}`);
            if (response.ok) {
                // console.log('respuesta ok');
                const turnos = await response.json();
                // console.log('turnos' + turnos);
                mostrarResultadosEnDesplegable(turnos);
                if (turnos.length === 1) {
                    datosPacienteSeleccionado = turnos[0];
                }
            } else {
                console.error('Error en la respuesta:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los datos. Inténtalo nuevamente.');
        }
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query.length > 0) {
            buscarPacienteInput(query);
        } else {
            resultadosContainer.innerHTML = ''; // Limpiar tabla si no hay búsqueda
        }
    });



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const mostrarTurnosHce = ( turnosHistoria ) => {
        resultadosContainer.innerHTML = '';
        let ultimoTurnoMarcado = false;

        if (!turnosHistoria || turnosHistoria.length === 0) {
            resultadosContainer.innerHTML = '<tr><td colspan="7" class="text-center alert alert-warning">No se encontraron turnos para este paciente.</td></tr>';
            return;
        }

        // Mostrar el nombre del paciente antes del bucle, si hay turnos
        const nombrePaciente = turnosHistoria[0].nombre_paciente || 'Nombre del Paciente No Disponible';
        const trNombrePaciente = document.createElement('tr');
        trNombrePaciente.innerHTML = `<td colspan="7" style="background-color: #E6E6FA; text-align: center; font-weight: bold;">Paciente: ${nombrePaciente}</td>`;
        resultadosContainer.appendChild(trNombrePaciente);

        turnosHistoria.forEach(turno => {
            const tr = document.createElement('tr');
            const esMismoMedico = turno.matricula_medico == matricula;
            console.log(turno.matricula_medico);
            console.log(matricula);
            tr.innerHTML = `
                <td class="turno-cell">${formatDate(turno.fecha)}</td> <!-- Modificar aquí -->
                <td class="turno-cell">${turno.profesional}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.nombre_alergia || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.descripcion_antecedente || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">${turno.resumen_diagnostico}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.resumen_evolucion || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.descripcion_habito || 'N/A') : 'Privado'}</td>
            `;
            // Verificar si es el primer turno del mismo médico
            if (esMismoMedico && !ultimoTurnoMarcado) {
                tr.addEventListener('click', () => {
                    // Redirigir a otra página con el número de turno, por ejemplo:
                    window.location.href = `/editarConsulta?numero_turno=${turno.numero_turno}&editar=true`;
                });
                ultimoTurnoMarcado = true; // Marcar que ya se ha pintado el primer turno
                // console.log('marco el primero')
            } else if (esMismoMedico && ultimoTurnoMarcado) {
                tr.addEventListener('click', () => {
                    // Redirigir a otra página con el número de turno, por ejemplo:
                    window.location.href = `/ampliarConsulta?numero_turno=${turno.numero_turno}`;
                });
            }

            resultadosContainer.appendChild(tr);
        });
    }

    //Si llega dni, ejecuto busqueda
    if (window.dni) {
        let dni = window.dni;
        try {
            const response = await fetch(`/buscarHcePacientePorDni?dni=${dni}`);
            if (response.ok) {
                console.log(dni)
                const turnos = await response.json();
                mostrarTurnosHce(turnos);
                console.log(turnos)
            } else {
                console.error('Error en la respuesta:', response.statusText);
                resultadosContainer.innerHTML = '<tr><td colspan="7" class="text-center alert alert-danger">No se pudo obtener la información del paciente.</td></tr>';
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            resultadosContainer.innerHTML = '<tr><td colspan="7" class="text-center alert alert-danger">Ocurrió un error al buscar los datos.</td></tr>';
        }
    }

    buscarButton.addEventListener('click', async () => {
        const dni = searchInput.value.match(/\d{8}$/); // Asegúrate de que el DNI sea correcto
        if (!dni) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa un Nombre o DNI válido',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        resultadosContainer.innerHTML = ''; // Limpiar resultados anteriores
        const loadingIndicator = document.createElement('tr');
        loadingIndicator.innerHTML = '<td colspan="7" class="text-center"><i class="bi bi-arrow-clockwise spinner-border" role="status"></i> Cargando turnos...</td>';
        resultadosContainer.appendChild(loadingIndicator);

        try {
            const response = await fetch(`/buscarHcePacientePorDni?dni=${dni[0]}`);
            if (response.ok) {
                const turnos = await response.json();
                mostrarTurnosHce(turnos);
            } else {
                console.error('Error en la respuesta:', response.statusText);
                resultadosContainer.innerHTML = '<tr><td colspan="7" class="text-center alert alert-danger">No se pudo obtener la información del paciente.</td></tr>';
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            resultadosContainer.innerHTML = '<tr><td colspan="7" class="text-center alert alert-danger">Ocurrió un error al buscar los datos.</td></tr>';
        }
    });


});