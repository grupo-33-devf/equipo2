const Respuesta = require('../model/respuestaModel')

const responder = async (req, res) => {
    res.status(200).json({ message: 'responder' })
}

const obtenerRespuestas = async (req, res) => {
    res.status(200).json({ message: 'obtenerRespuestas' })
}

module.exports = {
    responder,
    obtenerRespuestas
}