const express = require('express')
const router = express.Router()

/*
const { 
    responder, 
    obtenerRespuestas 
} = require('../controllers/respuestasControllers')
*/

// Funcion para responder una pregunta
router.post('/', responder)

// Funcion para obtener una respuesta
router.get('/:id', obtenerRespuestas)

module.exports = router