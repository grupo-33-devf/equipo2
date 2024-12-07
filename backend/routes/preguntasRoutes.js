const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    crearPregunta,
    modificarPregunta,
    borrarPregunta,
    obtenerPreguntas
} = require('../controllers/preguntasControllers')

// Función para crear una pregunta
router.post('/', protect, crearPregunta)

router.route('/:id')
    .put(protect, modificarPregunta) // Función para modificar una pregunta
    .delete(protect, borrarPregunta) // Función para borrar una pregunta
    .get(obtenerPreguntas)

module.exports = router