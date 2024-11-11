document.addEventListener('DOMContentLoaded', function () {
    const resultadosContainer = document.getElementById('tbodyResultados');
    const diaSelect = document.getElementById('dia');
    const mesSelect = document.getElementById('mes');
    const anioSelect = document.getElementById('anio');
    const loadingIndicator = document.createElement('tr');
    loadingIndicator.innerHTML = '<td colspan="4" class="text-center"><i class="bi bi-arrow-clockwise spinner-border" role="status"></i> Cargando turnos...</td>';
    
    // Inicializar la fecha actual
    const today = new Date();
    diaSelect.value = today.getDate();
    mesSelect.value = String(today.getMonth() + 1).padStart(2, '0');
    anioSelect.value = today.getFullYear();
  
    const fetchTurnos = (fecha) => {
        resultadosContainer.innerHTML = ''; // Limpiar resultados anteriores
        resultadosContainer.appendChild(loadingIndicator); // Mostrar loading
        
        fetch(`/turnos/${fecha}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                resultadosContainer.innerHTML = ''; // Limpiar resultados anteriores
                loadingIndicator.remove(); // Remover loading
                
                if (data.turnos && data.turnos.length > 0) {
                    data.turnos.forEach(turno => {
                        // console.log(JSON.stringify(turno) + 'dniiiiiiiii'); //Log para depurar
                        const tr = document.createElement('tr');
                        tr.classList.add(turno.numero_turno % 2 === 0 ? 'row-even' : 'row-odd'); // Clase según par o impar
                        
                        tr.innerHTML = `
                            <td class="turno-cell">${turno.hora.slice(0, 5)}</td>
                            <td class="turno-cell">${turno.nombre} ${turno.apellido}</td>
                            <td class="turno-cell">${turno.motivo_consulta}</td>
                            <td>
                                <a href="/cargarHceDni?dni=${turno.dni_paciente}" class="btn-hce">
                                    <i class="bi bi-heart-pulse-fill turno-icon" title="Ir a HCE del paciente"></i>
                                </a>
                            </td>
                        `;
                        resultadosContainer.appendChild(tr);
                    });
                } else {
                    resultadosContainer.innerHTML = '<tr><td colspan="4" class="text-center alert alert-warning">No se encontraron turnos para esta fecha.</td></tr>';
                }
            })
            .catch(error => {
                console.error('Error al solicitar los turnos:', error);
                resultadosContainer.innerHTML = '<tr><td colspan="4" class="text-center alert alert-danger">Ocurrió un error al solicitar los turnos.</td></tr>';
            });
    };
  
    document.getElementById('buscarTurnos').addEventListener('click', () => {
        const dia = diaSelect.value.padStart(2, '0');
        const mes = mesSelect.value;
        const anio = anioSelect.value;
        const fecha = `${anio}-${mes}-${dia}`;
        fetchTurnos(fecha);
    });
  
    fetchTurnos(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`); // Llamar al cargar
});
