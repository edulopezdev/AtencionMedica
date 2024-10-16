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


    // Función para limpiar y cargar los médicos filtrados
    const getMedicosXEspecialidad = (especialidadId) => {
        // Limpiar el select de médicos
        medicoSelect.innerHTML = '<option value="">Selecciona un médico</option>';

        // Filtrar los médicos por la especialidad seleccionada
        if (especialidadId) {
            medicos.forEach(medico => {
                // Buscar en el array de medicoEspecialidad para ver si este médico tiene la especialidad seleccionada
                medicoEspecialidad.forEach(relacion => {
                    if (medico.matricula_medico === relacion.matricula_medico && relacion.id_especialidad == especialidadId) {
                        console.log('Médico encontrado con especialidad: ' + relacion.id_especialidad);
                        const option = document.createElement('option');
                        option.value = medico.matricula_medico;
                        option.textContent = medico.apellido + " " + medico.nombre;
                        medicoSelect.appendChild(option);
                    }
                });
            });
        }
    }

    // Escuchar el cambio en el select de especialidades
    especialidadSelect.addEventListener('change', function () {
        const especialidadId = this.value;
        //console.log( especialidadId )
        getMedicosXEspecialidad(especialidadId);
    });

    /////////
    // Función para actualizar los turnos según la fecha seleccionada
    //Dentro llamo a escuchar click en cada LI de los turnos
    const actualizarTurnos = (fecha) => {
        // Hacer una petición fetch al servidor para obtener los turnos
        fetch(`/turnos/${fecha}`)
            .then(response => response.json())
            .then(data => {
                // Limpiar el contenedor de resultados
                resultadosContainer.innerHTML = '';

                // Verificar si hay turnos
                if (data.turnos.length > 0) {
                    const ul = document.createElement('ul');
                    ul.id = 'turnosList'; // Agregar el id turnosList al ul
                    data.turnos.forEach(turno => {
                        const li = document.createElement('li');
                        li.setAttribute('data-id', turno.numero_turno);
                        li.textContent = `ID del turno: ${turno.numero_turno}, Fecha: ${turno.fecha.slice(0, 10)}, Hora: ${turno.hora}, Motivo: ${turno.motivo_consulta}, Paciente: ${turno.dni_paciente}`;
                        ul.appendChild(li);
                    });
                    resultadosContainer.appendChild(ul);

                    escuchoClickTurno(); //escucho el click

                } else {
                    resultadosContainer.innerHTML = '<p>No se encontraron turnos para la fecha seleccionada.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener los turnos:', error);
                resultadosContainer.innerHTML = '<p>Ocurrió un error al obtener los turnos.</p>';
            });
    }

    // Escuchar el cambio en el input de fecha
    fechaCalendario.addEventListener('change', function () {
        //console.log('ejecutado front')
        const fechaSeleccionada = this.value;
        if (fechaSeleccionada) {
            actualizarTurnos(fechaSeleccionada);
        }
    });

    const escuchoClickTurno = () => { // escucho click en cada LI
        const turnosList = document.getElementById('turnosList'); // Obtener el nuevo ul
        // Verifica si la lista de turnos existe
        if (turnosList) {
            // Agrega un listener de clic a cada elemento li
            turnosList.addEventListener("click", function (event) {
                console.log('jajajajajaj')
                const turnoSeleccionado = event.target.closest("li"); // Verifica si el clic fue en un li
                if (turnoSeleccionado) {
                    const idTurno = turnoSeleccionado.getAttribute("data-id"); // Obtiene el ID del turno
                    alert("Turno seleccionado: " + idTurno); // Aquí puedes realizar la acción que desees
                    res.render('/getConsulta', { idTurno });
                    //deberia tener -matricula_medico, id_turno, 
                    //al hacer click, deberia aparecer un cartel o ir a iniciar consulta
                    //en la consulta deberiamos tener link a ver hce ( en la navegacion otro link )
                    //En la consulta veriamos tipo form 
                    //evolucion
                    //diagnostico
                    //alergia ( mas de uno y fecha )
                    //antecedente ( fecha )
                    //habito ( fecha )
                    //medicamento ( mas de uno )
                }
            });
        }
    }
    escuchoClickTurno();
});
