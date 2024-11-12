document.addEventListener('DOMContentLoaded', function () {
  // boton
  const btnHcePaciente = document.getElementById('btnHcePaciente');
  // Evolucion ok
  const txtEvolucion = document.getElementById('evolucion');
  // Diagnostico ok
  const txtDiagnostico = document.getElementById('diagnostico');
  let estadoDiagnosticoSelect = document.getElementById('estadoDiagnostico');
  const addDiagnosticoButton = document.getElementById('addDiagnosticoButton');
  // Alergia 
  const alergiaTextarea = document.getElementById('alergia');
  let estadoAlergiaSelect = document.getElementById('estadoAlergia');
  const inicioAlergia = document.getElementById('inicioAlergia');
  const finAlergia = document.getElementById('finAlergia');
  //Antecedentes
  const inicioAntecedentes = document.getElementById('inicioAntecedentes');
  const finAntecedentes = document.getElementById('finAntecedentes');
  const antecedentes = document.getElementById('antecedentes');
  //habitos
  const inicioHabitos = document.getElementById('inicioHabitos');
  const finHabitos = document.getElementById('finHabitos');
  const habitos = document.getElementById('habitos');
  // Medicamentos
  const medicamentoSelect = document.getElementById('medicamento');
  // llenado de desplegable templates y auto completado de input
  const templateSelect = document.getElementById('template');
  const evolucionInput = document.getElementById('evolucion');
  // Boton de enviar
  const botonGuardar = document.getElementById('guardarBoton');
  const botonModificar = document.getElementById('modificarBoton');
  const btnAddTemplate = document.getElementById('btnAddTemplate');
  //Checks
  const checkAlergia = document.getElementById('checkboxAlergias');
  const checkAntecedente = document.getElementById('checkboxAntecedentes');
  const checkHabito = document.getElementById('checkboxHabitos');
  const checkMedicamento = document.getElementById('checkboxMedicamentos');
  // console.log(btnAddTemplate)
  // datos del turno
  const turno = window.turno;
  const numero_turno = turno.numero_turno;
  const estado = window.estado;
  // console.log(estado);
  //Boton add diagnostico
  //=====================================Estado del turno condiciona el llenado del pug

  //===================================texto enriquecido====================================
  // Inicializar Quill en el div con el ID 'evolucion'
  let quill = new Quill('#evolucion', {
    theme: 'snow',
    placeholder: '* Ingrese la evolución del paciente',
    modules: {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
      ]
    }
  });

  const addDiagnosticoParametro = (diagnostico, index) => {
    const diagnosticosContainer = document.getElementById('diagnosticosContainer');

    // Crear el contenedor para el nuevo diagnóstico
    const nuevoDiagnostico = document.createElement('div');
    nuevoDiagnostico.classList.add('diagnostico-item', 'mb-3');
    nuevoDiagnostico.setAttribute('data-index', index); // Agregar un índice único para identificar cada bloque

    // Crear el contenido HTML del nuevo diagnóstico
    nuevoDiagnostico.innerHTML = `
        <label for="diagnostico${index}" class="form-label">Diagnóstico:</label>
        <textarea class="form-control" name="diagnostico" id="diagnostico${index}" placeholder="Ingresar diagnóstico" rows="3"></textarea>

        <label for="estadoDiagnostico${index}" class="form-label">Estado del Diagnóstico:</label>
        <select class="form-select" name="estadoDiagnostico" id="estadoDiagnostico${index}">
            <option value="">Seleccionar</option>
            <option value="Preliminar">Preliminar</option>
            <option value="Confirmado">Confirmado</option>
        </select>

        <input type="hidden" name="id_diagnostico" id="id_diagnostico${index}" value="${diagnostico.id_diagnostico}">
    `;

    // Agregar el nuevo diagnóstico al contenedor
    diagnosticosContainer.appendChild(nuevoDiagnostico);

    // Cargar los valores del diagnóstico en los campos correspondientes
    const textareaDiagnostico = nuevoDiagnostico.querySelector(`#diagnostico${index}`);
    const selectEstadoDiagnostico = nuevoDiagnostico.querySelector(`#estadoDiagnostico${index}`);
    const hiddenIdDiagnostico = nuevoDiagnostico.querySelector(`#id_diagnostico${index}`);

    // Asignar los valores a los campos, si existen
    if (diagnostico.resumen_diagnostico) {
      textareaDiagnostico.value = diagnostico.resumen_diagnostico;
    }

    if (diagnostico.estado) {
      selectEstadoDiagnostico.value = diagnostico.estado;
    }

    if (diagnostico.id_diagnostico) {
      hiddenIdDiagnostico.value = diagnostico.id_diagnostico; // Establecer el valor del id_diagnostico
    }
  };
  const addDiagnosticoParametroBloqueados = (diagnostico, index) => {
    const diagnosticosContainer = document.getElementById('diagnosticosContainer');

    // Crear el contenedor para el nuevo diagnóstico
    const nuevoDiagnostico = document.createElement('div');
    nuevoDiagnostico.classList.add('diagnostico-item', 'mb-3');
    nuevoDiagnostico.setAttribute('data-index', index); // Agregar un índice único para identificar cada bloque

    // Crear el contenido HTML del nuevo diagnóstico
    nuevoDiagnostico.innerHTML = `
        <label for="diagnostico${index}" class="form-label">Diagnóstico:</label>
        <textarea class="form-control" name="diagnostico" id="diagnostico${index}" placeholder="Ingresar diagnóstico" rows="3"></textarea>

        <label for="estadoDiagnostico${index}" class="form-label">Estado del Diagnóstico:</label>
        <select class="form-select" name="estadoDiagnostico" id="estadoDiagnostico${index}">
            <option value="">Seleccionar</option>
            <option value="Preliminar">Preliminar</option>
            <option value="Confirmado">Confirmado</option>
        </select>

        <input type="hidden" name="id_diagnostico" id="id_diagnostico${index}" value="${diagnostico.id_diagnostico}">
    `;

    // Agregar el nuevo diagnóstico al contenedor
    diagnosticosContainer.appendChild(nuevoDiagnostico);

    // Cargar los valores del diagnóstico en los campos correspondientes
    const textareaDiagnostico = nuevoDiagnostico.querySelector(`#diagnostico${index}`);
    const selectEstadoDiagnostico = nuevoDiagnostico.querySelector(`#estadoDiagnostico${index}`);
    const hiddenIdDiagnostico = nuevoDiagnostico.querySelector(`#id_diagnostico${index}`);

    // Asignar los valores a los campos, si existen
    if (diagnostico.resumen_diagnostico) {
      textareaDiagnostico.value = diagnostico.resumen_diagnostico;
    }

    if (diagnostico.estado) {
      selectEstadoDiagnostico.value = diagnostico.estado;
    }

    if (diagnostico.id_diagnostico) {
      hiddenIdDiagnostico.value = diagnostico.id_diagnostico; // Establecer el valor del id_diagnostico
    }

    textareaDiagnostico.disabled = true;
    selectEstadoDiagnostico.disabled = true;
    hiddenIdDiagnostico.disabled = true;

  };


  // Función para obtener los diagnósticos en un array
  const getDiagnosticosArrayParametro = () => {
    const diagnosticos = [];

    // Selecciona todos los elementos de diagnóstico
    const diagnosticoItems = document.querySelectorAll('.diagnostico-item');

    diagnosticoItems.forEach(item => {
      const textareaDiagnostico = item.querySelector('textarea[name="diagnostico"]').value;
      const selectEstadoDiagnostico = item.querySelector('select[name="estadoDiagnostico"]').value;
      const hiddenIdDiagnostico = item.querySelector('input[name="id_diagnostico"]').value; // Obtener el id_diagnostico

      // Agregar el diagnóstico y estado como un objeto al array, junto con el id_diagnostico
      diagnosticos.push({
        id_diagnostico: hiddenIdDiagnostico,  // Incluir el id_diagnostico
        diagnostico: textareaDiagnostico,
        estado: selectEstadoDiagnostico
      });
    });

    return diagnosticos;
  };


  //==============================================================================================
  // Método para llenar los campos cuando el estado es "atendido"
  const llenarCamposAtendido = (turno) => {
    botonGuardar.style.display = 'none';
    addDiagnosticoButton.style.display = 'none';
    templateSelect.style.display = 'none';

    //Desplegar checks
    document.getElementById('checkboxAlergias').checked = true;
    toggleFields('alergiasContainer', document.getElementById('checkboxAlergias'));
    document.getElementById('checkboxAntecedentes').checked = true;
    toggleFields('antecedentesContainer', document.getElementById('checkboxAntecedentes'));
    document.getElementById('checkboxHabitos').checked = true;
    toggleFields('habitosContainer', document.getElementById('checkboxHabitos'));
    document.getElementById('checkboxMedicamentos').checked = true;
    toggleFields('medicamentoContainer', document.getElementById('checkboxMedicamentos'));



    // txtEvolucion.value = turno.resumen_evolucion || '';
    quill.root.innerHTML = turno.resumen_evolucion || '';
    // txtEvolucion.readOnly = true;
    quill.enable(false);
    quill.root.dataset.placeholder = '';

    estadoDiagnosticoSelect.value = turno.diagnosticos[0].estado || '';
    estadoDiagnosticoSelect.disabled = true;

    txtDiagnostico.value = turno.diagnosticos[0].resumen_diagnostico || '';
    txtDiagnostico.readOnly = true;

    // Si hay más de un diagnóstico, agregar los campos adicionales
    if (turno.diagnosticos && turno.diagnosticos.length > 1) {
      for (let i = 1; i < turno.diagnosticos.length; i++) {
        const diagnostico = turno.diagnosticos[i];
        addDiagnosticoParametroBloqueados(diagnostico); // Llamada a la función para agregar el diagnóstico
      }
    }

    inicioAlergia.value = turno.aler_desde ? turno.aler_desde.substring(0, 10) : '';
    inicioAlergia.readOnly = true;

    finAlergia.value = turno.aler_hasta ? turno.aler_hasta.substring(0, 10) : '';
    finAlergia.readOnly = true;

    alergiaTextarea.value = turno.nombre_alergia || '';
    alergiaTextarea.readOnly = true;

    estadoAlergiaSelect.value = turno.importancia || '';
    estadoAlergiaSelect.disabled = true;

    inicioAntecedentes.value = turno.ant_desde ? turno.ant_desde.substring(0, 10) : '';
    inicioAntecedentes.readOnly = true;

    finAntecedentes.value = turno.ant_hasta ? turno.ant_hasta.substring(0, 10) : '';
    finAntecedentes.readOnly = true;

    antecedentes.value = turno.descripcion_antecedente || '';
    antecedentes.readOnly = true;

    inicioHabitos.value = turno.hab_desde ? turno.hab_desde.substring(0, 10) : '';
    inicioHabitos.readOnly = true;

    finHabitos.value = turno.hab_hasta ? turno.hab_hasta.substring(0, 10) : '';
    finHabitos.readOnly = true;

    habitos.value = turno.descripcion_habito || '';
    habitos.readOnly = true;

    medicamentoSelect.value = turno.id_medicamento || '';
    medicamentoSelect.disabled = true;
  };

  // Método para llenar los campos cuando el estado es "editar"
  const llenarCamposEditar = (turno) => {

    botonGuardar.style.display = 'none';
    botonModificar.style.display = "block";
    addDiagnosticoButton.style.display = 'none';


    // txtEvolucion.value = turno.resumen_evolucion || '';
    quill.root.innerHTML = turno.resumen_evolucion || '';

    txtDiagnostico.value = turno.diagnosticos[0].resumen_diagnostico || '';

    estadoDiagnosticoSelect.value = turno.diagnosticos[0].estado || '';

    // Crear un campo oculto para el id_diagnostico en el primer diagnóstico
    const hiddenIdDiagnostico = document.createElement('input');
    hiddenIdDiagnostico.type = 'hidden';
    hiddenIdDiagnostico.name = 'id_diagnostico';
    hiddenIdDiagnostico.id = 'id_diagnostico0';  // Asegúrate de que el id sea único
    hiddenIdDiagnostico.value = turno.diagnosticos[0].id_diagnostico;  // Asignar el id_diagnostico

    // Asumir que tienes un contenedor donde insertar estos campos estáticos
    document.getElementById('diagnosticosContainer').appendChild(hiddenIdDiagnostico);

    // Si hay más de un diagnóstico, agregar los campos adicionales
    if (turno.diagnosticos && turno.diagnosticos.length > 1) {
      for (let i = 1; i < turno.diagnosticos.length; i++) {
        const diagnostico = turno.diagnosticos[i];
        addDiagnosticoParametro(diagnostico); // Llamada a la función para agregar el diagnóstico
      }
    }

    alergiaTextarea.value = turno.nombre_alergia || '';

    estadoAlergiaSelect.value = turno.importancia || '';

    inicioAlergia.value = turno.aler_desde ? turno.aler_desde.substring(0, 10) : '';

    finAlergia.value = turno.aler_hasta ? turno.aler_hasta.substring(0, 10) : '';

    inicioAntecedentes.value = turno.ant_desde ? turno.ant_desde.substring(0, 10) : '';

    finAntecedentes.value = turno.ant_hasta ? turno.ant_hasta.substring(0, 10) : '';

    antecedentes.value = turno.descripcion_antecedente || '';

    inicioHabitos.value = turno.hab_desde ? turno.hab_desde.substring(0, 10) : '';

    finHabitos.value = turno.hab_hasta ? turno.hab_hasta.substring(0, 10) : '';

    habitos.value = turno.descripcion_habito || '';

    medicamentoSelect.value = turno.id_medicamento || '';
  }
  //Logica segun estado de turno
  console.log(turno);
  if (estado === 'Atendido') {
    console.log('atendido entro');
    llenarCamposAtendido(turno);
  } else if (estado === 'Editar') {
    console.log('editar entro');
    llenarCamposEditar(turno);
  }
  //botones
  if (btnHcePaciente) {
    btnHcePaciente.addEventListener('click', () => {
      window.location.href = `/cargarHceDni?dni=${turno.dni_paciente}`;
    });
  }
  if (btnAddTemplate) {
    btnAddTemplate.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Clickkkkkkk')
      window.location.href = `/nuevaTemplate`;
    });
  }

  //Metodos
  const mostrarError = (mensaje) => {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  const error = () => {

    // Verificar campos principales
    if (!quill.getText().trim()) {
      mostrarError('Campo Evolución es obligatorio');
      return true;
    }

    if (!txtDiagnostico.value || !estadoDiagnosticoSelect.value) {
      mostrarError('Campos diagnóstico son obligatorio');
      return true;
    }

    // Verificar alergias si está marcada
    if (checkAlergia.checked && (!alergiaTextarea.value || !estadoAlergiaSelect.value || !inicioAlergia.value)) {
      mostrarError('Si existe alergia, debe completar los campos');
      return true;
    }

    // Verificar antecedentes si está marcado
    if (checkAntecedente.checked && (!inicioAntecedentes.value || !antecedentes.value)) {
      mostrarError('Si existe antecedente, debe completar los campos');
      return true;
    }

    // Verificar hábitos si está marcado
    if (checkHabito.checked && (!inicioHabitos.value || !habitos.value)) {
      mostrarError('Si existe hábito, debe completar los campos');
      return true;
    }

    // Verificar medicamento si está marcado
    if (checkMedicamento.checked && !medicamentoSelect.value) {
      mostrarError('Si existe medicamento, debe completar la selección');
      return true;
    }
    return false;
  }


  //Agregar mas de un diagnostico
  // console.log('ejecutando front.....')
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
    <button type="button" class="btn btn-danger mt-2 remove-diagnostico">Eliminar</button>
  `;

    diagnosticosContainer.appendChild(nuevoDiagnostico);

    // Agregar el evento para eliminar este diagnóstico
    const removeButton = nuevoDiagnostico.querySelector('.remove-diagnostico');
    removeButton.addEventListener('click', () => {
      diagnosticosContainer.removeChild(nuevoDiagnostico);
    });
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
    // evolucionInput.value = contenidoTemplate || '';
    quill.root.innerHTML = contenidoTemplate || '';
  }

  templateSelect.addEventListener('change', llenarEvolucion);

  // Diagnostico -> Escucha el cambio en el desplegable y lo guarda=========================
  estadoDiagnosticoSelect.addEventListener('change', (event) => {
    estadoDiagnosticoSelect.value = event.target.value;
  });

  // Alergias ===============================================
  estadoAlergiaSelect.addEventListener('change', (event) => {
    estadoAlergiaSelect.value = event.target.value;
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

    // Obtener los valores de Evolución, Diagnóstico y Estado de Diagnóstico
    const evolucion = quill.root.innerHTML || '';  // Si quill.root.innerHTML es undefined, asignamos un string vacío
    const estadoDiagnostico = diagnosticosArray.length > 0 && diagnosticosArray[0].estado ? diagnosticosArray[0].estado : ''; // Verificamos si existe un estado
    const diagnostico = diagnosticosArray.length > 0 && diagnosticosArray[0].diagnostico ? diagnosticosArray[0].diagnostico : ''; // Cambié 'descripcion' por 'diagnostico'


    // Crear objeto con todos los datos
    const datosFormulario = {
      evolucion: evolucion,
      diagnosticosArray,
      alergia: {
        texto: alergiaTextarea.value,
        nivel: estadoAlergiaSelect.value,
        fechaDesde: document.querySelector('#inicioAlergia').value,
        fechaHasta: document.querySelector('#finAlergia').value,
      },
      antecedentes,
      habitos,
      medicamento: medicamentoSelect.value,
      numero_turno,
    };

    // console.log('Datos del formulario:', datosFormulario);
    // Llama a error() y solo continúa si no hay errores
    if (error()) {
      return; // Detiene la ejecución si hay errores
    }
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
              text: 'Hubo un error al procesar su solicitud',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  });

  // Escuchar el clic en el botón "Guardar"
  botonModificar.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el envío del formulario

    // Desestructuramos los valores de antecedentes y hábitos ===========================
    const { antecedentes } = obtenerDatosAntecedentes();
    const { habitos } = obtenerDatosHabitos();
    const diagnosticosArray = getDiagnosticosArrayParametro();
    const id_receta = turno.id_receta;

    // Obtener los valores de Evolución, Diagnóstico y Estado de Diagnóstico
    const evolucion = quill.root.innerHTML || '';  // Si quill.root.innerHTML es undefined, asignamos un string vacío
    const estadoDiagnostico = diagnosticosArray.length > 0 && diagnosticosArray[0].estado ? diagnosticosArray[0].estado : ''; // Verificamos si existe un estado
    const diagnostico = diagnosticosArray.length > 0 && diagnosticosArray[0].diagnostico ? diagnosticosArray[0].diagnostico : ''; // Cambié 'descripcion' por 'diagnostico'

    // Imprimir valores para depuración
    console.log('Diagnóstico Array:', diagnosticosArray);  // Veremos cómo se ve el array


    // Validar que todos los campos necesarios estén completos

    // Crear objeto con todos los datos
    const datosFormulario = {
      evolucion: evolucion,
      diagnosticosArray,
      alergia: {
        texto: alergiaTextarea.value,
        nivel: estadoAlergiaSelect.value,
        fechaDesde: document.querySelector('#inicioAlergia').value,
        fechaHasta: document.querySelector('#finAlergia').value,
      },
      antecedentes,
      habitos,
      medicamento: medicamentoSelect.value,
      id_receta: id_receta,  // Usamos el id_receta en lugar de numero_turno para modificación
      numero_turno,
    };

    console.log('Datos del formulario:', datosFormulario);
    // Llama a error() y solo continúa si no hay errores
    if (error()) {
      return; // Detiene la ejecución si hay errores
    }
    // Primero, pide confirmación antes de guardar
    Swal.fire({
      title: 'Confirmar Modificación',
      text: '¿Está seguro de que desea modificar la consulta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, realizar la solicitud fetch
        console.log("Modificando consulta...");
        fetch('/modificarConsulta', { // Cambia esta ruta a la correcta
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
              text: 'Consulta modificada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              // Redirigir a otra página si es necesario
              window.location.href = '/getMain'; // Cambia esto si necesitas otra URL
            });
          })
          .catch(error => {
            console.error('Error:', error);
            // Mostrar mensaje de error si ocurre un problema con el fetch
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error en la base de datos al procesar su solicitud',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  });


});
