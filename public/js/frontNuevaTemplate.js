document.addEventListener('DOMContentLoaded', function () {

  const guardarTemplate = async (nombre, descripcion) => {
      // console.log('Método front'); //Log para depurar
      try {
          //Enviamos los datos al servidor en formato JSON
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
              //Si la respuesta es exitosa, mostramos un mensaje de confirmación con SweetAlert
              Swal.fire({
                  title: '¡Éxito!',
                  text: 'El template se ha guardado correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              }).then(() => {
                  //Redirigimos a la página principal después de la confirmación
                  window.location.href = '/getMain';
              });
          } else {
              console.error('Error en la respuesta:', response.statusText);
              //Si ocurre un error, mostramos un mensaje de error
              Swal.fire({
                  title: 'Error',
                  text: 'Hubo un problema al guardar el template. Inténtalo nuevamente.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
              });
          }
      } catch (error) {
          console.error('Error en la búsqueda:', error);
          //Si hay un error en la comunicación, mostramos un mensaje de error
          Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al guardar el template. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
      }
  }

  document.getElementById('guardarBoton').addEventListener('click', function (event) {
      event.preventDefault(); //Evita que el formulario se envíe automáticamente al hacer clic en el botón

      const nombreTemplate = document.getElementById('nombre_template').value;
      const descripcionTemplate = document.getElementById('descripcion_template').value;

      //Validamos que el nombre del template no esté vacío
      if (!nombreTemplate.trim()) {
          Swal.fire({
              title: 'Error',
              text: 'Por favor, ingresa el nombre del template.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
          });
          return;
      }

      //Validamos que la descripción del template no esté vacía
      if (!descripcionTemplate.trim()) {
          Swal.fire({
              title: 'Error',
              text: 'Por favor, ingresa una descripción del template.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
          });
          return;
      }

      //Mostramos una alerta de confirmación antes de guardar el template
      Swal.fire({
          title: '¿Estás seguro?',
          text: 'Se guardarán los cambios realizados en el template.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, guardar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              //Si el usuario confirma, llamamos a la función guardarTemplate con los datos del formulario
              //console.log(nombreTemplate, descripcionTemplate); //Log para depurar
              guardarTemplate(nombreTemplate, descripcionTemplate);
          }
      });
  });
});
