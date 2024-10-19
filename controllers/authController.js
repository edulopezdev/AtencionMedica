// controllers/authController.js
const { autenticarMedico } = require('../services/db-services');

// Controlador para manejar la autenticación
exports.postLogin = async (req, res) => {
    const usuario = req.body.usuario; // Obtén el usuario del formulario
    const contrasenia = req.body.contrasenia; // Obtén la contraseña del formulario

    try {
        // Llama a la función del servicio para autenticar al médico
        const resultados = await autenticarMedico(usuario, contrasenia);

        if (resultados.length > 0) {
            // Redirige a la página principal pasando el usuario en la query string
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
