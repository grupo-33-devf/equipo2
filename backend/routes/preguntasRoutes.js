const express = require('express')
const router = express.Router()

/*const { 
    crearPregunta, 
    modificarPregunta, 
    borrarPregunta 
} = require('../controllers/preguntasControllers')
*/

// Función para crear una pregunta
router.post('/', crearPregunta)

router.route('/:id')
    .put(modificarPregunta) // Función para modificar una pregunta
    .delete(borrarPregunta) // Función para borrar una pregunta

module.exports = router