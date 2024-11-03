document.addEventListener('DOMContentLoaded', function () {
  // Evolucion ok
  const txtEvolucion = document.getElementById('evolucion');
  // Diagnostico ok
  const txtDiagnostico = document.getElementById('diagnostico');
  let estadoDiagnosticoSelect = document.getElementById('estadoDiagnostico');
  // Alergia 
  const alergiaTextarea = document.getElementById('alergia');
  let estadoAlergiaSelect = document.getElementById('estadoAlergia');
  // Medicamentos
  const medicamentoSelect = document.getElementById('medicamento');
  // llenado de desplegable templates y auto completado de input
  const templateSelect = document.getElementById('template');
  const evolucionInput = document.getElementById('evolucion');
  // Boton de enviar
  const botonGuardar = document.getElementById('guardarBoton');
  // datos del turno
  const turno = window.turno;
  const numero_turno = turno.numero_turno;

  // Evolucion
  const llenarEvolucion = () => {
    const selectedOption = templateSelect.options[templateSelect.selectedIndex];
    const contenidoTemplate = selectedOption.getAttribute('data-contenido');
    evolucionInput.value = contenidoTemplate || '';
  }

  templateSelect.addEventListener('change', llenarEvolucion);

  // Diagnostico -> Escucha el cambio en el desplegable y lo guarda
  estadoDiagnosticoSelect.addEventListener('change', (event) => {
    estadoDiagnosticoSelect = event.target.value;
  });

  // Alergias
  estadoAlergiaSelect.addEventListener('change', (event) => {
    estadoAlergiaSelect = event.target.value;
  });

  // Antecedentes
  const obtenerDatosAntecedentes = () => {
    const inicioAntecedentes = document.getElementById('inicioAntecedentes').value;
    const finAntecedentes = document.getElementById('finAntecedentes').value;
    const antecedentes = document.getElementById('antecedentes').value;

    return {
      antecedentes: {
        inicioAntecedentes,
        finAntecedentes,
        antecedentes
      }
    };
  }

  // Habitos
  const obtenerDatosHabitos = () => {
    const inicioHabitos = document.getElementById('inicioHabitos').value;
    const finHabitos = document.getElementById('finHabitos').value;
    const habitos = document.getElementById('habitos').value;

    return {
      habitos: {
        inicioHabitos,
        finHabitos,
        habitos
      }
    };
  }

  // Medicamentos
  const llenarDetallesMedicamento = () => {
    const selectedOption = medicamentoSelect.options[medicamentoSelect.selectedIndex];
  };

  medicamentoSelect.addEventListener('change', llenarDetallesMedicamento);

  // Escuchar el clic en el botón "Guardar"
  botonGuardar.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el envío del formulario

    // Desestructuramos los valores de antecedentes y hábitos
    const { antecedentes } = obtenerDatosAntecedentes();
    const { habitos } = obtenerDatosHabitos();

    // Crear objeto con todos los datos
    const datosFormulario = {
      evolucion: txtEvolucion.value,
      diagnostico: {
        texto: txtDiagnostico.value,
        estado: estadoDiagnosticoSelect
      },
      alergia: {
        texto: alergiaTextarea.value,
        nivel: estadoAlergiaSelect,
        fechaDesde: document.querySelector('#inicioAlergia').value,
        fechaHasta: document.querySelector('#finAlergia').value,
      },
      antecedentes,
      habitos,
      medicamento: medicamentoSelect.value,
      numero_turno,
    };

    console.log('Datos del formulario:', datosFormulario);

    // Primero, pide confirmación antes de guardar
    Swal.fire({
      title: 'Confirmar Consulta',
      text: '¿Está seguro de que desea guardar la consulta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, realizar la solicitud fetch
        fetch('/guardarConsulta', { // Cambia esta ruta a la correcta
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosFormulario)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          return response.json(); // Suponiendo que tu backend devuelve un JSON
        })
        .then(data => {
          console.log('Respuesta del servidor:', data);
          
          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Éxito',
            text: 'Consulta guardada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigir a otra página si es necesario
            window.location.href = '/getMain'; // Cambia esto si necesitas otra URL
          });
        })
        .catch(error => {
          console.error('Error:', error);
          // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Error al guardar la consulta',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
  });
});
