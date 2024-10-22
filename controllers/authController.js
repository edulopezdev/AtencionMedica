// controllers/authController.js
const { autenticarMedico } = require('../services/db-services');

//Probando autenticacion
// Controlador para manejar la autenticación
exports.authMiddleware = (req, res, next) => {
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
        console.log('asdasddsads')
        const resultados = await autenticarMedico(usuario, contrasenia);

        if (resultados.length > 0) {
            // Guarda el estado de sesión
            req.session.isLoggedIn = true; // Marca al usuario como autenticado
            req.session.usuario = usuario; // Guarda el nombre de usuario o identificador
            // Redirige a la página principal
            res.redirect(`/getMain?usuario=${usuario}`);
        } else {
            // Credenciales incorrectas
            res.send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).send('Error en la base de datos');
    }
};

// Controlador para renderizar la vista de login
exports.getLogin = (req, res) => {
    res.render('login'); // Renderiza la vista 'login'
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

// module.exports = {
//     authMiddleware, // Exporta el middleware también
// };


// Controlador para manejar la autenticación
// exports.postLogin = async (req, res) => {
//     const usuario = req.body.usuario; // Obtén el usuario del formulario
//     const contrasenia = req.body.contrasenia; // Obtén la contraseña del formulario

//     try {
//         // Llama a la función del servicio para autenticar al médico
//         const resultados = await autenticarMedico(usuario, contrasenia);

//         if (resultados.length > 0) {
//             // Redirige a la página principal pasando el usuario en la query string
//             res.redirect(`/getMain?usuario=${usuario}`);
//         } else {
//             // Credenciales incorrectas
//             res.send('Usuario o contraseña incorrectos');
//         }
//     } catch (error) {
//         console.error('Error en la consulta:', error);
//         return res.status(500).send('Error en la base de datos');
//     }
// };
