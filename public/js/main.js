document.addEventListener('DOMContentLoaded', function () {
    // Selecciona los elementos del DOM
    const especialidadSelect = document.getElementById('especialidad');
    const medicoSelect = document.getElementById('medico');
    const medicos = window.medicos;
    const medicoEspecialidad = window.medicoEspecialidad;


    // Función para limpiar y cargar los médicos filtrados
    const getMedicosXEspecialidad = ( especialidadId ) => {
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
});
