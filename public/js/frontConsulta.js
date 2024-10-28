

document.addEventListener('DOMContentLoaded', function () {
  //Evolucion ok
  const txtEvolucion = document.getElementById('evolucion');
  //Diagnostico ok
  const txtDiagnostico = document.getElementById('diagnostico');
  const estadoDiagnosticoSelect = document.getElementById('estadoDiagnostico');
  //Alergia 
  const alergiaTextarea = document.getElementById('alergia');
  const estadoAlergiaSelect = document.getElementById('estadoAlergia');
  //Medicamentos
  const medicamentoSelect = document.getElementById('medicamento');
  // llenado de desplegable templates y auto completado de input
  const templateSelect = document.getElementById('template');
  const evolucionInput = document.getElementById('evolucion');


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
  const obtenerDatosHabitos = () =>{
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







});
