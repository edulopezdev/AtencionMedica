document.getElementById('guardarBoton').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    const nombreTemplate = document.getElementById('nombre_template').value;
    const descripcionTemplate = document.getElementById('descripcion_template').value;
    // Llamar a la función guardarTemplate con los datos del formulario
    guardarTemplate(nombreTemplate, descripcionTemplate);
});

const guardarTemplate = async (nombre, descripcion) => {
    console.log('metodo front');
    try {
        // Enviar los datos como JSON al servidor
        const response = await fetch('/crearTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_template: nombre,
                descripcion_template: descripcion
            }),
        });

        if (response.ok) {
            // Redirigir a la página de inicio si la creación fue exitosa
            window.location.href = '/index';
        } else {
            console.error('Error en la respuesta:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        alert('Hubo un problema al guardar el template. Inténtalo nuevamente.');
    }
}
