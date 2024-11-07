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
  const estado = window.estado;
  //Boton add diagnostico
  const addDiagnosticoButton = document.getElementById('addDiagnosticoButton');

  //=====================================Estado del turno condiciona el llenado del pug
  // Método para llenar los campos cuando el estado es "atendido"
  const llenarCamposAtendido = (turno) => {
    templateSelect.disabled = true;
    estadoAlergiaSelect.disabled = true;
    medicamentoSelect.disabled = true;

    txtEvolucion.value = turno.resumen_evolucion || '';
    txtEvolucion.readOnly = true;

    txtDiagnostico.value = turno.resumen_diagnostico || '';
    txtDiagnostico.readOnly = true;

    estadoDiagnosticoSelect.value = turno.diag_estado || '';
    estadoDiagnosticoSelect.disabled = true;

    alergiaTextarea.value = turno.nombre_alergia || '';
    alergiaTextarea.readOnly = true;

    estadoAlergiaSelect.value = turno.importancia || '';
    estadoAlergiaSelect.disabled = true;

    medicamentoSelect.value = turno.id_medicamento || '';
    medicamentoSelect.disabled = true;

    botonGuardar.disabled = true;

    // Llenar otros campos adicionales y establecerlos como solo lectura
    const estadoAlergia = document.getElementById('estadoAlergia');
    estadoAlergia.value = turno.importancia || '';
    estadoAlergia.readOnly = true;

    const inicioAlergia = document.getElementById('inicioAlergia');
    inicioAlergia.value = (turno.aler_desde).substring(0,10) || '';
    inicioAlergia.readOnly = true;

    const finAlergia = document.getElementById('finAlergia');
    finAlergia.value = turno.aler_hasta.substring(0,10) || '';
    finAlergia.readOnly = true;

    const inicioAntecedentes = document.getElementById('inicioAntecedentes');
    inicioAntecedentes.value = turno.ant_desde.substring(0,10) || '';
    inicioAntecedentes.readOnly = true;

    const finAntecedentes = document.getElementById('finAntecedentes');
    finAntecedentes.value = turno.ant_hasta.substring(0,10) || '';
    finAntecedentes.readOnly = true;

    const antecedentes = document.getElementById('antecedentes');
    antecedentes.value = turno.descripcion_antecedente || '';
    antecedentes.readOnly = true;

    const inicioHabitos = document.getElementById('inicioHabitos');
    inicioHabitos.value = turno.hab_desde.substring(0,10) || '';
    inicioHabitos.readOnly = true;

    const finHabitos = document.getElementById('finHabitos');
    finHabitos.value = turno.hab_hasta.substring(0,10) || '';
    finHabitos.readOnly = true;

    const habitos = document.getElementById('habitos');
    habitos.value = turno.descripcion_habito || '';
    habitos.readOnly = true;
  };


  // Método para llenar los campos cuando el estado es "editar"
  const llenarCamposEditar = (turno) => {

    txtEvolucion.value = turno.resumen_evolucion || '';

    txtDiagnostico.value = turno.resumen_diagnostico || '';

    estadoDiagnosticoSelect.value = turno.diag_estado || '';

    alergiaTextarea.value = turno.nombre_alergia || '';

    estadoAlergiaSelect.value = turno.importancia || '';

    medicamentoSelect.value = turno.id_medicamento || '';


    // Llenar otros campos adicionales y establecerlos como solo lectura
    const estadoAlergia = document.getElementById('estadoAlergia');
    estadoAlergia.value = turno.importancia || '';

    const inicioAlergia = document.getElementById('inicioAlergia');
    inicioAlergia.value = turno.aler_desde.substring(0,10) || '';

    const finAlergia = document.getElementById('finAlergia');
    finAlergia.value = turno.aler_hasta.substring(0,10) || '';

    const inicioAntecedentes = document.getElementById('inicioAntecedentes');
    inicioAntecedentes.value = turno.ant_desde.substring(0,10) || '';

    const finAntecedentes = document.getElementById('finAntecedentes');
    finAntecedentes.value = turno.ant_hasta.substring(0,10) || '';

    const antecedentes = document.getElementById('antecedentes');
    antecedentes.value = turno.descripcion_antecedente || '';

    const inicioHabitos = document.getElementById('inicioHabitos');
    inicioHabitos.value = turno.hab_desde.substring(0,10) || '';

    const finHabitos = document.getElementById('finHabitos');
    finHabitos.value = turno.hab_hasta.substring(0,10) || '';

    const habitos = document.getElementById('habitos');
    habitos.value = turno.descripcion_habito || '';
  }

  console.log(turno);
  if (estado === 'Atendido') {
    console.log('atendido entro');
    llenarCamposAtendido(turno);
  } else if (estado === 'Editar') {
    console.log('editar entro');
    llenarCamposEditar(turno);
  }

  //Agregar mas de un diagnostico
  // console.log('ejecutando front.....')
  // Función para agregar un nuevo diagnóstico
  const addDiagnostico = () => {
    const diagnosticosContainer = document.getElementById('diagnosticosContainer');

    const nuevoDiagnostico = document.createElement('div');
    nuevoDiagnostico.classList.add('diagnostico-item', 'mb-3');

    nuevoDiagnostico.innerHTML = `
    <label for="diagnostico" class="form-label">Diagnóstico:</label>
    <textarea class="form-control" name="diagnostico" placeholder="Ingresar diagnóstico" rows="3"></textarea>

    <label for="estadoDiagnostico" class="form-label">Estado del Diagnóstico:</label>
    <select class="form-select" name="estadoDiagnostico">
      <option value="">Seleccionar</option>
      <option value="Preliminar">Preliminar</option>
      <option value="Confirmado">Confirmado</option> 
    </select>
  `;

    diagnosticosContainer.appendChild(nuevoDiagnostico);
  };

  // Función para recoger todos los diagnósticos en un array de objetos
  const getDiagnosticosArray = () => {
    const diagnosticos = [];

    // Selecciona todos los elementos de diagnóstico
    const diagnosticoItems = document.querySelectorAll('.diagnostico-item');

    diagnosticoItems.forEach(item => {
      const diagnostico = item.querySelector('textarea[name="diagnostico"]').value;
      const estadoDiagnostico = item.querySelector('select[name="estadoDiagnostico"]').value;

      // Agregar el diagnóstico y estado como un objeto al array
      diagnosticos.push({
        diagnostico: diagnostico,
        estado: estadoDiagnostico
      });
    });

    return diagnosticos;
  };

  addDiagnosticoButton.addEventListener('click', addDiagnostico);


  // Evolucion ================================================
  const llenarEvolucion = () => {
    const selectedOption = templateSelect.options[templateSelect.selectedIndex];
    const contenidoTemplate = selectedOption.getAttribute('data-contenido');
    evolucionInput.value = contenidoTemplate || '';
  }

  templateSelect.addEventListener('change', llenarEvolucion);

  // Diagnostico -> Escucha el cambio en el desplegable y lo guarda=========================
  estadoDiagnosticoSelect.addEventListener('change', (event) => {
    estadoDiagnosticoSelect = event.target.value;
  });

  // Alergias ===============================================
  estadoAlergiaSelect.addEventListener('change', (event) => {
    estadoAlergiaSelect = event.target.value;
  });

  // Antecedentes =====================================================
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

  // Habitos =============================================
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

  // Medicamentos ===========================================
  const llenarDetallesMedicamento = () => {
    const selectedOption = medicamentoSelect.options[medicamentoSelect.selectedIndex];
  };

  medicamentoSelect.addEventListener('change', llenarDetallesMedicamento);

  // Escuchar el clic en el botón "Guardar"
  botonGuardar.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el envío del formulario

    // Desestructuramos los valores de antecedentes y hábitos ===========================
    const { antecedentes } = obtenerDatosAntecedentes();
    const { habitos } = obtenerDatosHabitos();
    const diagnosticosArray = getDiagnosticosArray();

    // Crear objeto con todos los datos
    const datosFormulario = {
      evolucion: txtEvolucion.value,
      diagnosticosArray,
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
              text: 'Debe completar los campos obligatorios',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  });
});
