

document.addEventListener('DOMContentLoaded', function () {
  //Evolucion ok
  const txtEvolucion = document.getElementById('evolucion');
  //Diagnostico ok
  const txtDiagnostico = document.getElementById('diagnostico');
  let estadoDiagnosticoSelect = document.getElementById('estadoDiagnostico');
  //Alergia 
  const alergiaTextarea = document.getElementById('alergia');
  let estadoAlergiaSelect = document.getElementById('estadoAlergia');
  //Medicamentos
  const medicamentoSelect = document.getElementById('medicamento');
  // llenado de desplegable templates y auto completado de input
  const templateSelect = document.getElementById('template');
  const evolucionInput = document.getElementById('evolucion');
  //Boton de enviar
  const botonGuardar = document.getElementById('guardarBoton');
  //datos del turno
  const turno = window.turno;
  const numero_turno = turno.numero_turno;



  // Evolucion
  const llenarEvolucion = () => {
    const selectedOption = templateSelect.options[templateSelect.selectedIndex];
    const contenidoTemplate = selectedOption.getAttribute('data-contenido');
    evolucionInput.value = contenidoTemplate || '';
  }

  templateSelect.addEventListener('change', llenarEvolucion);

  //Diagnostico ->  Escucha el cambio en el desplegable y lo guarda
  estadoDiagnosticoSelect.addEventListener('change', (event) => {
    estadoDiagnosticoSelect = event.target.value;

  });

  //Alergias
  estadoAlergiaSelect.addEventListener('change', (event) => {
    estadoAlergiaSelect = event.target.value;

  });

  //Antecedentes
  // Function to retrieve input values
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

  //Habitos
  const obtenerDatosHabitos = () => {
    // Recuperar datos de hábitos
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

  //Medicamentos
  const llenarDetallesMedicamento = () => {
    const selectedOption = medicamentoSelect.options[medicamentoSelect.selectedIndex];
  };

  // Evento para actualizar detalles cuando cambia la selección
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
    // Aquí puedes enviar `datosFormulario` a tu backend o hacer cualquier otra acción

    // Enviar los datos al endpoint cargarConsultaCompleta
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
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
        alert('Consulta guardada correctamente');
        window.location.href = '/getMain';
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje de error
        alert('Error al guardar la consulta');
      });

  });


});

