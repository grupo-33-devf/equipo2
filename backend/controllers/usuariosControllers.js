const Usuario = require('../model/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) return res.status(409).json({ mensaje: 'El usuario ya existe' });

        const encryptedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({ nombre, email, password: encryptedPassword });
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token, usuario_id: usuario._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

const oauth = async (req, res) => {
    const { oauth_id, nombre, email, oauth_provider } = req.user;

    try {
        let usuario = await Usuario.findOne({ oauth_id });
        if (!usuario) {
            usuario = new Usuario({ nombre, email, oauth_provider, oauth_id });
            await usuario.save();
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`${process.env.BASE_URL}?token=${token}`);
    } catch (error) {
        res.status(500).json({ message: 'Error en OAuth', error: error.message });
    }
};

const logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

module.exports = { register, login, oauth, logout };
