

document.addEventListener('DOMContentLoaded', function() {
    const txtEvolucion = document.getElementById('evolucion');
    const txtDiagnostico = document.getElementById('diagnostico');
    const txtAlergia = document.getElementById('alergia');
    const btnAddAlergia = document.getElementById('addAlergia');
    const txtMedicamento = document.getElementById('medicamentosContainer');
    const btnAddMedicamento = document.getElementById('addMedicamento');

    // Lógica para agregar más alergias
    addAlergiaButton.addEventListener('click', function() {
      const newAlergia = document.createElement('div');
      newAlergia.innerHTML = `
        <select name="alergia[]">
          <option value="">Seleccionar alergia</option>
          <option value="polen">Polen</option>
          <option value="polvo">Polvo</option>
          <option value="medicamento">Medicamento</option>
          <option value="alimentos">Alimentos</option>
        </select>
        <button type="button" class="removeAlergia">- Eliminar</button>`;
      alergiasContainer.appendChild(newAlergia);

      // Agregar la funcionalidad de remover campo
      newAlergia.querySelector('.removeAlergia').addEventListener('click', function() {
        newAlergia.remove();
      });
    });

    // Lógica para agregar más medicamentos
    addMedicamentoButton.addEventListener('click', function() {
      const newMedicamento = document.createElement('div');
      newMedicamento.innerHTML = `
        <input type="text" name="medicamento[]" placeholder="Ingresar medicamento">
        <button type="button" class="removeMedicamento">- Eliminar</button>`;
      medicamentosContainer.appendChild(newMedicamento);

      // Agregar la funcionalidad de remover campo
      newMedicamento.querySelector('.removeMedicamento').addEventListener('click', function() {
        newMedicamento.remove();
      });
    });
  });
