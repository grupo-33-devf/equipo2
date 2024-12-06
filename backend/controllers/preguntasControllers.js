const Pregunta = require('../model/preguntaModel')

const crearPregunta = async (req, res) => {
    res.status(200).json({ message: 'crearPregunta' })
}

const modificarPregunta = async (req, res) => {
    res.status(200).json({ message: 'modificarPregunta' })
}

const borrarPregunta = async (req, res) => {
    res.status(200).json({ message: 'borrarPregunta' })
}

module.exports = {
    crearPregunta,
    modificarPregunta,
    borrarPregunta
}