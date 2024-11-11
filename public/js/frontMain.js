document.addEventListener('DOMContentLoaded', function () {
    const turnosList = document.getElementById("resultadosContainer");

    turnosList.addEventListener("click", function (event) {
        const cardSeleccionada = event.target.closest(".card");

        // Verifica si se ha seleccionado una tarjeta de turno
        if (cardSeleccionada) {
            const horaTurno = cardSeleccionada.querySelector('.card-title').innerText; // Obtener la hora del turno
            const turnoInfo = window.turnos[horaTurno]; // Obtener la información del turno desde el objeto `turnos`

            // Verifica si hay información del turno seleccionada
            if (turnoInfo) {
                if (turnoInfo.estado.toLowerCase() === 'atendido') {
                    // Mostrar un SweetAlert para preguntar si desea modificar el turno
                    Swal.fire({
                        title: 'Turno Atendido',
                        text: `El turno para el paciente ${turnoInfo.nombre} ${turnoInfo.apellido} ya ha sido atendido. ¿Desea modificar el turno?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#28a745', // Botón "Sí"
                        cancelButtonColor: '#dc3545',  // Botón "No" con color rojo
                        confirmButtonText: 'Sí, modificar turno',
                        cancelButtonText: 'No, cancelar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirigir a la página para ampliar/modificar la consulta
                            window.location.href = `/editarConsulta?numero_turno=${turnoInfo.numero}&editar=true`;
                        }
                    });
                } else if (turnoInfo.estado.toLowerCase() === 'cancelado') {
                    Swal.fire({
                        title: 'Turno Cancelado',
                        text: 'Este turno ha sido cancelado y no se puede iniciar una consulta.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    const nombrePaciente = `${turnoInfo.nombre} ${turnoInfo.apellido}`;
                    const numero_turno = horaTurno;
                    const numero = turnoInfo.numero;

                    Swal.fire({
                        title: 'Confirmar Consulta',
                        text: `¿Está seguro de que desea iniciar la consulta para el paciente: ${nombrePaciente}?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#28a745',
                        cancelButtonColor: '#dc3545',
                        confirmButtonText: 'Sí, iniciar consulta',
                        cancelButtonText: 'No, cancelar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirigir a la página para iniciar la consulta
                            window.location.href = `/getConsulta?hora=${numero_turno}&numero_turno=${numero}`;
                        }
                    });
                }
            } else {
                // Si no hay información del turno, indica que el turno está libre
                Swal.fire({
                    title: 'Turno Libre',
                    text: 'Este turno está libre. No se puede iniciar una consulta.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    });
});
