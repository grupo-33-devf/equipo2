const Usuario = require('../model/usuarioModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { nombre, email, password } = req.body
    try {
        // Verificamos si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ email })
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        // Creación del usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: encryptedPassword,
        })

        const usuarioGuardado = await nuevoUsuario.save()
        res.status(201).json({ message: 'El usuario se creo con exito', usuario: usuarioGuardado })

    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario.', error: error.message });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'No se econtro el usuario' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Se inicio sesión correctamente', token });
    } catch (error) {
        res.status(500).json({ message: 'Error de inicio de sesión.', error: error.message });
    }
}

const oauth = async (req, res) => {
    const { oauth_provider, oauth_id, nombre, email } = req.body;
    try {
        //Verificamos en la base de datos exista oauth_id
        let usuario = await Usuario.findOne({ oauth_id });

        if (!usuario) {
            // De no existir creara un usuario nuevo
            usuario = new Usuario({
                nombre,
                email,
                oauth_provider,
                oauth_id,
            });

            await usuario.save();
        }

        // Generar un token JWT que el frontend se encargara de guardar en el local storage
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión mediante OAuth exitoso.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión mediante OAuth.', error: error.message });
    }
}

const logout = (req, res) => {
    try {
        // El frontend es el encargado de borrar el token del localStorage
        res.status(200).json({ message: 'Cierre de sesión exitoso.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cerrar sesión.', error: error.message });
    }
}

module.exports = {
    register,
    login,
    oauth,
    logout
}