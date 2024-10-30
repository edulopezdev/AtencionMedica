// controllers/authController.js
const { autenticarMedico, obtenerMedicoLogueado } = require('../services/conectionService');
//Probando autenticacion
// Controlador para manejar la autenticación
exports.authMiddleware = (req, res, next) => {
//linea para evitar que guarde las paginas en cache y recargue desde el servidor
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    // Verifica si hay una sesión activa
    if (req.session && req.session.isLoggedIn) {
        // El usuario está autenticado, continúa a la siguiente función de middleware
        return next();
    } else {
        // El usuario no está autenticado, redirigir a la página de inicio de sesión
        res.redirect('/login'); // Cambia esto a la ruta correcta
    }
};
exports.postLogin = async (req, res) => {
    const usuario = req.body.usuario; // Obtén el usuario del formulario
    const contrasenia = req.body.contrasenia; // Obtén la contraseña del formulario

    try {
        // Llama a la función del servicio para autenticar al médico
        const resultados = await autenticarMedico(usuario, contrasenia);

        if (resultados.length > 0) {
            // Espera a que se obtenga el médico logueado
            const medico = await obtenerMedicoLogueado(usuario);

            if (medico) {
                // Almacena el nombre y el ID del médico en la sesión
                req.session.nombre = medico[0].nombre + ' ' + medico[0].apellido;
                req.session.matricula = usuario;
                //req.session.id = medico.id;

                // Guarda el estado de sesión
                req.session.isLoggedIn = true; // Marca al usuario como autenticado
                req.session.usuario = usuario; // Guarda el nombre de usuario o identificador

                // Redirige a la página principal
                return res.redirect(`/getMain`);
            } else {
                // Si no se encuentra el médico, maneja el error
                return res.send('Médico no encontrado');
            }
        } else {
            // Credenciales incorrectas
            return res.send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).send('Error en la base de datos');
    }
};

// Controlador para renderizar la vista de login
exports.getLogin = (req, res) => {


    if ( req.session.isLoggedIn ) {
        // Si hay una sesión activa, ejecuta el logout y redirige a la página de inicio de sesión
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Error al cerrar sesión');
            }
            console.log('Session cerrada');
            res.render('login'); // Redirige a la página de inicio de sesión después de cerrar sesión
        });
    } else {
        // Si no hay sesión activa, redirige directamente a la página de inicio de sesión
        res.render('login');
    }
};


// Controlador para redirigir a la página de inicio de sesión desde "/"
exports.redirectLogin = (req, res) => {
    res.redirect('/login'); // Redirige a /login
};

// Método para cerrar sesión
exports.logout = (req, res) => {
    // Destruye la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        // Redirige a la página de inicio de sesión
        res.redirect('/login');
    });
};

