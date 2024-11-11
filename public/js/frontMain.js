document.addEventListener('DOMContentLoaded', function () {
  const turnosList = document.getElementById("resultadosContainer");

  turnosList.addEventListener("click", function (event) {
      const cardSeleccionada = event.target.closest(".card");

      //Verifica si se ha seleccionado una tarjeta de turno
      if (cardSeleccionada) {
          const horaTurno = cardSeleccionada.querySelector('.card-title').innerText; //Obtenemos la hora del turno
          const turnoInfo = window.turnos[horaTurno]; //Buscamos la información del turno usando la hora como clave

          //Comprobamos si encontramos información sobre el turno
          if (turnoInfo) {
              if (turnoInfo.estado.toLowerCase() === 'atendido') {
                  //Si el turno ya fue atendido, mostramos una alerta preguntando si desea modificarlo
                  Swal.fire({
                      title: 'Turno Atendido',
                      text: `El turno para el paciente ${turnoInfo.nombre} ${turnoInfo.apellido} ya ha sido atendido. ¿Te gustaría modificar este turno?`,
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#28a745', //Botón verde para confirmar
                      cancelButtonColor: '#dc3545',  //Botón rojo para cancelar
                      confirmButtonText: 'Sí, modificar turno',
                      cancelButtonText: 'No, cancelar',
                  }).then((result) => {
                      if (result.isConfirmed) {
                          //Si el usuario confirma, lo redirigimos a la página para modificar el turno
                          window.location.href = `/editarConsulta?numero_turno=${turnoInfo.numero}&editar=true`;
                      }
                  });
              } else if (turnoInfo.estado.toLowerCase() === 'cancelado') {
                  //Si el turno está cancelado, mostramos una alerta informando que no se puede iniciar consulta
                  Swal.fire({
                      title: 'Turno Cancelado',
                      text: 'Este turno ha sido cancelado y no se puede iniciar la consulta.',
                      icon: 'warning',
                      confirmButtonText: 'Aceptar'
                  });
              } else {
                  //Si el turno está disponible, mostramos una alerta para confirmar que se desea iniciar la consulta
                  const nombrePaciente = `${turnoInfo.nombre} ${turnoInfo.apellido}`;
                  const numero_turno = horaTurno;
                  const numero = turnoInfo.numero;

                  Swal.fire({
                      title: 'Confirmar Consulta',
                      text: `¿Estás seguro de que deseas iniciar la consulta para el paciente: ${nombrePaciente}?`,
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#28a745', //Botón verde para confirmar
                      cancelButtonColor: '#dc3545', //Botón rojo para cancelar
                      confirmButtonText: 'Sí, iniciar consulta',
                      cancelButtonText: 'No, cancelar',
                  }).then((result) => {
                      if (result.isConfirmed) {
                          //Si el usuario confirma, lo redirigimos a la página para iniciar la consulta
                          window.location.href = `/getConsulta?hora=${numero_turno}&numero_turno=${numero}`;
                      }
                  });
              }
          } else {
              //Si no encontramos información sobre el turno, significa que está libre
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
