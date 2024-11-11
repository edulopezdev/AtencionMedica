document.addEventListener('DOMContentLoaded', function () {

  const guardarTemplate = async (nombre, descripcion) => {
      console.log('Método front');
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
              // Mostrar mensaje de éxito con SweetAlert
              Swal.fire({
                  title: '¡Éxito!',
                  text: 'El template se ha guardado correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              }).then(() => {
                  // Redirigir a la página principal después de la confirmación
                  window.location.href = '/getMain';
              });
          } else {
              console.error('Error en la respuesta:', response.statusText);
              Swal.fire({
                  title: 'Error',
                  text: 'Hubo un problema al guardar el template. Inténtalo nuevamente.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
              });
          }
      } catch (error) {
          console.error('Error en la búsqueda:', error);
          Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al guardar el template. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
      }
  }

  document.getElementById('guardarBoton').addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe automáticamente

      const nombreTemplate = document.getElementById('nombre_template').value;
      const descripcionTemplate = document.getElementById('descripcion_template').value;

      // Validar que los campos no estén vacíos
      if (!nombreTemplate.trim()) {
          Swal.fire({
              title: 'Error',
              text: 'Por favor, ingresa el nombre del template.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
          });
          return;
      }

      if (!descripcionTemplate.trim()) {
          Swal.fire({
              title: 'Error',
              text: 'Por favor, ingresa una descripción del template.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
          });
          return;
      }

      // Preguntar al usuario si está seguro de guardar el template
      Swal.fire({
          title: '¿Estás seguro?',
          text: 'Se guardarán los cambios realizados en el template.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, guardar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              // Llamar a la función guardarTemplate con los datos del formulario
              console.log(nombreTemplate, descripcionTemplate);
              guardarTemplate(nombreTemplate, descripcionTemplate);
          }
      });
  });
});
