document.addEventListener('DOMContentLoaded', function () {
    const fechaCalendario = document.getElementById('fechaCalendario');
    const resultadosContainer = document.getElementById('resultadosContainer');
  
    fechaCalendario.addEventListener('change', function() {
      const fecha = this.value;
      // console.log( fecha ); 
      fetchTurnos( fecha );
    });
  
    const fetchTurnos = ( fecha ) => {
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
            // console.log( data.turnos.length );
          // Verificamos si hay turnos disponibles
          if (turnos && turnos.length > 0) {
            // Crear el card para mostrar los turnos
            const card = document.createElement('div');
            card.className = 'card';
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
  
            // Crear la lista de turnos
            const ul = document.createElement('ul');
            ul.className = 'list-group';
  
            turnos.forEach(turno => {
              const li = document.createElement('li');
              li.className = 'list-group-item';
              li.innerHTML = `
                <strong>ID del turno:</strong> ${turno.numero_turno}<br>
                <strong>Fecha:</strong> ${turno.fecha}<br>
                <strong>Hora:</strong> ${turno.hora}<br>
                <strong>Motivo:</strong> ${turno.motivo_consulta}<br>
                <strong>Paciente:</strong> ${turno.dni_paciente}
              `;
              ul.appendChild(li);
            });
  
            // Insertar la lista dentro del card
            cardBody.appendChild(ul);
            card.appendChild(cardBody);
            resultadosContainer.appendChild(card);
          } else {
            // Mostrar mensaje de que no hay turnos para la fecha
            resultadosContainer.innerHTML = '<div class="alert alert-warning">No se encontraron turnos para esta fecha.</div>';
          }
        })
        .catch(error => {
          console.error('Error al solicitar los turnos:', error);
          resultadosContainer.innerHTML = '<div class="alert alert-danger">Ocurrió un error al solicitar los turnos.</div>';
        });
    }
  });
  