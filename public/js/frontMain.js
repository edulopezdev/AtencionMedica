document.addEventListener('DOMContentLoaded', function () {
    const turnosList = document.getElementById("resultadosContainer");

    turnosList.addEventListener("click", function (event) {
        const cardSeleccionada = event.target.closest(".card");
        if (cardSeleccionada) {
            const horaTurno = cardSeleccionada.querySelector('.card-title').innerText; // Obtener la hora del turno
            
            // Cambia aquí para usar window.turnos en lugar de solo turnos.
            const turnoInfo = window.turnos[horaTurno]; 

            if (turnoInfo) { 
                const nombrePaciente = `${turnoInfo.nombre} ${turnoInfo.apellido}`;
                const numero_turno = horaTurno;
                const numero = turnoInfo.numero;

                Swal.fire({
                    title: 'Confirmar Consulta',
                    text:`¿Está seguro de que desea iniciar la consulta para el paciente:${nombrePaciente}?`,
                    icon:'question',
                    showCancelButton:true,
                    confirmButtonColor:'#28a745',
                    cancelButtonColor:'#dc3545',
                    confirmButtonText:'Sí, iniciar consulta',
                    cancelButtonText:'No, cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `/getConsulta?hora=${numero_turno}&numero_turno=${numero}`;
                    }
                });
            } else {
                Swal.fire({
                    title:'Turno Libre',
                    text:'Este turno está libre. No se puede iniciar una consulta.',
                    icon:'info',
                    confirmButtonText:'Aceptar'
                });
            }
        }
    });
});