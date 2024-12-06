const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Usuario = require('../model/usuarioModel');

// Middleware para proteger rutas
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Verifica si el encabezado de autorización está presente y contiene el token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.Usuario = await Usuario.findById(decoded.id).select('-password');

            if (!req.Usuario) {
                res.status(401).json({ message: 'Usuario no encontrado' });
                return;
            }

            next();
        } catch (error) {
            console.error('Error en la verificación del token:', error.message);

            res.status(401).json({ message: 'Acceso no autorizado, token inválido' });
        }
    } else {
        res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
    }
});

module.exports = { protect };
