document.addEventListener('DOMContentLoaded', function () {
  const resultadosContainer = document.getElementById('resultadosContainer');

  // Inicializar Flatpickr
  flatpickr('#calendario', {
      inline: true, // Muestra el calendario abierto
      onChange: function(selectedDates) {
          const fecha = selectedDates[0];
          if (fecha) {
              const fechaString = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
              fetchTurnos(fechaString);
          }
      }
  });

  const fetchTurnos = (fecha) => {
      // Verificamos si se seleccionó una fecha válida
      if (!fecha) {
          resultadosContainer.innerHTML = '<div class="alert alert-warning">Por favor, seleccione una fecha válida.</div>';
          return;
      }

      // Realizamos la petición fetch
      fetch(`/turnos/${fecha}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Error en la respuesta de la red');
              }
              return response.json();
          })
          .then(data => {
              const turnos = data.turnos;
              resultadosContainer.innerHTML = ''; // Limpiar resultados anteriores

              // Verificamos si hay turnos disponibles
              if (turnos && turnos.length > 0) {
                  turnos.forEach(turno => {
                      // Crear el elemento directamente sin ul
                      const li = document.createElement('div');
                      li.className = 'list-group-item d-flex justify-content-between align-items-center';
                      li.setAttribute('data-id', turno.numero_turno);
                      li.setAttribute('data-nombre', `${turno.nombre} ${turno.apellido}`);

                      // Agregar contenido al turno
                      li.innerHTML = `
                          <span style="width: 100%;">
                              <strong>Hora:</strong> ${turno.hora.slice(0, 5)} | 
                              <strong>Paciente:</strong> ${turno.nombre} ${turno.apellido} | 
                              <strong>Motivo:</strong> ${turno.motivo_consulta}
                          </span>
                      `;

                      resultadosContainer.appendChild(li); // Agregar el turno directamente al contenedor
                  });
              } else {
                  resultadosContainer.innerHTML = '<div class="alert alert-warning">No se encontraron turnos para esta fecha.</div>';
              }
          })
          .catch(error => {
              console.error('Error al solicitar los turnos:', error);
              resultadosContainer.innerHTML = '<div class="alert alert-danger">Ocurrió un error al solicitar los turnos.</div>';
          });
  };
});
