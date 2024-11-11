const { autenticarMedico, obtenerMedicoLogueado } = require('../services/conectionService');

//Este middleware lo usamos para proteger rutas que requieren autenticación
exports.authMiddleware = (req, res, next) => {
    //Evitamos que se guarde la página en cache
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    //Acá se verifica si hay una sesión activa
    if (req.session && req.session.isLoggedIn) {
        //Si el usuario está autenticado, continúa con el siguiente middleware
        return next();
    } else {
        //Si el usuario no está autenticado, redirige a la página de login
        res.redirect('/login');
    }
};

//Este controlador para manejar la autenticación (inicio de sesión)
exports.postLogin = async (req, res) => {
    const { usuario, contrasenia } = req.body; //Desestructuración de las variables

    try {
        //Llamamos a la función del servicio para autenticar al médico
        const resultados = await autenticarMedico(usuario, contrasenia);

        if (resultados.length > 0) {
            //Si se encuentra el usuario, obtener el médico logueado
            const medico = await obtenerMedicoLogueado(usuario);

            if (medico && medico.length > 0) {
                //Acá almacenamos el nombre y la matrícula del médico en la sesión
                req.session.nombre = `${medico[0].nombre} ${medico[0].apellido}`;
                req.session.matricula = usuario;
                req.session.isLoggedIn = true; //Este true marca al usuario como autenticado
                req.session.usuario = usuario; //Acá se suarda el nombre de usuario

                //Redirigimos a la página principal
                return res.redirect('/getMain');
            } else {
                //Si el médico no se encuentra indicamos y redirigimos al login
                req.session.errorMessage = 'Médico no encontrado';
                return res.redirect('/login');
            }
        } else {
            //Si las credenciales son incorrectas lo indicamos y redirigimos al login
            req.session.errorMessage = 'Usuario o contraseña incorrectos';
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).send('Error en la base de datos');
    }
};

//Este controlador lo usamos para renderizar la vista de login
exports.getLogin = (req, res) => {
    const errorMessage = req.session.errorMessage; //Se recupera el mensaje de error de la sesión

    //Limpiamos el mensaje de error cada vez que se acceda al login
    delete req.session.errorMessage;

    //Si hay un mensaje de error, se pasa a la vista
    res.render('login', { errorMessage });
};

//Este controlador es para redirigir a la página de inicio de sesión desde "/"
exports.redirectLogin = (req, res) => {
    res.redirect('/login'); //Se redirige a /login
};

//Este es el método para cerrar sesión
exports.logout = (req, res) => {
    //Acá se destruye la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        //En esta línea es donde se redirige a la página de inicio de sesión
        res.redirect('/login');
    });
};
