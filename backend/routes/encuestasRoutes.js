const express = require('express')
const router = express.Router()

/*
const { 
    obtenerEncuestas,
    publicarEncuesta,
    obtenerEncuesta,
    modificarEncuesta,
    borrarEncuesta,
    generarQr,
    verResultados 
} = require('../controllers/encuestasControllers')
*/

router
    .route('/')
    .get(obtenerEncuestas) // Función para obtener encuestas
    .post(publicarEncuesta) // Función para publicar encuestas

router
    .route('/:id')
    .get(obtenerEncuesta) // Función para obtener una determinada encuesta en base a su id
    .put(modificarEncuesta) // Función para modificar una determinada encuesta en base a su id
    .delete(borrarEncuesta) // Función para borrar una determinada encuesta en base a su id

router.get('/:id/qr', generarQr) // Función para generar el qr de una encuesta en base a su id

router.get('/:id/resultados', verResultados) // Función para ver los resultados de una encuesta en base a su id

module.exports = router