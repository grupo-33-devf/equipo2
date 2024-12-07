const express = require('express')
const router = express.Router()
const {
    register,
    login,
    oauth,
    logout
} = require('../controllers/usuariosControllers')

router.post('/register', register) // Función para registrar usuario 

router.post('/login', login) // Función para inciar sesión

router.post('/oauth', oauth) // Función para inciar sesión con OAuth

router.get('/logout', logout) // Función para cerrar sesion

module.exports = router