document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('search');
    const buscarButton = document.getElementById('buscarHCE');
    const resultadosContainer = document.getElementById('resultados'); // Contenedor para los resultados de los turnos
    const datosPacienteContainer = document.getElementById('datosPaciente'); // Contenedor para los datos del paciente
    const nombrePacienteDiv = document.getElementById('nombrePaciente'); // Contenedor para el nombre del paciente
    const dniPacienteDiv = document.getElementById('dniPaciente'); // Contenedor para el DNI del paciente
    let datosPacienteSeleccionado = null;
    const matricula = window.matricula; // Matrícula del profesional médico logueado
    console.log(window.matricula + ' - matrícula en front');

    // Función para mostrar los resultados en el datalist de búsqueda
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

    // Función para buscar pacientes por nombre
    const buscarPacienteInput = async (query) => {
        try {
            const response = await fetch(`/buscarPacientesPorNombre?query=${encodeURIComponent(query)}`);
            if (response.ok) {
                const turnos = await response.json();
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

    // Event listener para capturar el input en el campo de búsqueda
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query.length > 0) {
            buscarPacienteInput(query);
        } else {
            resultadosContainer.innerHTML = ''; // Limpiar tabla si no hay búsqueda
        }
    });

    // Función para formatear la fecha en el formato dd-mm-yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Función para mostrar los turnos del paciente
    const mostrarTurnosHce = (turnosHistoria) => {
        resultadosContainer.innerHTML = '';
        let ultimoTurnoMarcado = false;

        if (!turnosHistoria || turnosHistoria.length === 0) {
            resultadosContainer.innerHTML = '<tr><td colspan="7" class="text-center alert alert-warning">No se encontraron turnos para este paciente.</td></tr>';
            return;
        }

        // Ordenar los turnos por fecha (del más reciente al más antiguo)
        turnosHistoria.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // Mostrar los datos del paciente antes de los turnos
        const nombrePaciente = turnosHistoria[0].nombre_paciente || 'Nombre del Paciente No Disponible';
        const dniPaciente = turnosHistoria[0].dni_paciente || 'DNI No Disponible';

        // Mostrar los datos del paciente (nombre y DNI)
        nombrePacienteDiv.innerHTML = `Nombre: ${nombrePaciente}`;
        dniPacienteDiv.innerHTML = `DNI: ${dniPaciente}`;

        // Hacer visible el contenedor de los datos del paciente
        datosPacienteContainer.style.display = 'block';

        // Mostrar los turnos en la tabla
        turnosHistoria.forEach((turno, index) => {
            const tr = document.createElement('tr');

            // Verificar si el médico logueado atendió este turno (si la matrícula coincide)
            const esMismoMedico = turno.matricula_medico == matricula;

            // Solo se muestran los datos completos si el médico logueado es el que atendió el turno
            tr.innerHTML = `
                <td class="turno-cell">${formatDate(turno.fecha)}</td>
                <td class="turno-cell">${turno.profesional}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.nombre_alergia || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.descripcion_antecedente || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">${turno.resumen_diagnostico}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.resumen_evolucion || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">${esMismoMedico ? (turno.descripcion_habito || 'N/A') : 'Privado'}</td>
                <td class="turno-cell">
                 <!-- Solo mostrar el botón en el último turno -->
                    ${index === 0 ? `
                        <button class="btn btn-info btn-accion" data-turno-id="${turno.numero_turno}" data-es-mismo-medico="${esMismoMedico}">
                            <i class="lni lni-pencil-1"></i> Editar
                        </button>
                    ` : ''}
                </td>
            `;


            // Agregar evento de clic solo al botón del último turno
            if (index === 0) {
                const botonAccion = tr.querySelector('.btn-accion');
                botonAccion.addEventListener('click', () => {
                    const turnoId = botonAccion.getAttribute('data-turno-id');
                    const esMismoMedico = botonAccion.getAttribute('data-es-mismo-medico') === 'true';

                    // Redirigir al usuario dependiendo del médico que atendió el turno
                    if (esMismoMedico) {
                        // Redirigir a la página de editar consulta
                        window.location.href = `/editarConsulta?numero_turno=${turnoId}&editar=true`;
                    } else {
                        // Redirigir a la página de ampliar consulta
                        window.location.href = `/ampliarConsulta?numero_turno=${turnoId}`;
                    }
                });
            }

            // Agregar la fila a la tabla
            resultadosContainer.appendChild(tr);
        });
    };

    // Si llega dni, ejecuto búsqueda
    if (window.dni) {
        let dni = window.dni;
        try {
            const response = await fetch(`/buscarHcePacientePorDni?dni=${dni}`);
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
    }

    // Event listener para buscar paciente al hacer clic en el botón de búsqueda
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
