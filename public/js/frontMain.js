document.addEventListener('DOMContentLoaded', function () {
    // Selecciona los elementos del DOM
    const especialidadSelect = document.getElementById('especialidad');
    const medicoSelect = document.getElementById('medico');
    const fechaCalendario = document.getElementById('fechaCalendario');
    const resultadosContainer = document.getElementById('resultadosContainer');
    const turnosList = document.getElementById("turnosList");

    const medicos = window.medicos;
    const medicoEspecialidad = window.medicoEspecialidad;
    const turnos = window.turnos;

    const escuchoClickTurno = () => { 
        const turnosList = document.getElementById('turnosList');
        if (turnosList) {
            turnosList.addEventListener("click", function (event) {
                const turnoSeleccionado = event.target.closest("li");
                if (turnoSeleccionado) {
                    const numero_turno = turnoSeleccionado.getAttribute("data-id");
                    alert("Ud esta por comenzar la consulta... poner un Y/N de bootstrap: " );
    
                    // Redirige a la ruta del backend para cargar la vista 'consulta' mando idTurno
                    window.location.href = `/getConsulta?numero_turno=${numero_turno}`;
                }
            });
        }
    }
    escuchoClickTurno();
    
});
