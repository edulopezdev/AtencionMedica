document.addEventListener('DOMContentLoaded', function () {
    const turnosList = document.getElementById("resultadosContainer");

    turnosList.addEventListener("click", function (event) {
        const turnoSeleccionado = event.target.closest("li");
        if (turnoSeleccionado) {
            const numero_turno = turnoSeleccionado.getAttribute("data-id");
            const nombrePaciente = turnoSeleccionado.getAttribute("data-nombre");

            // Usar SweetAlert2 para mostrar el modal de confirmación
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
                    window.location.href = `/getConsulta?numero_turno=${numero_turno}`;
                }
            });
        }
    });
});
