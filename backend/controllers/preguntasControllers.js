const Pregunta = require('../model/preguntaModel')
const Encuesta = require('../model/encuestaModel')

const crearPregunta = async (req, res) => {
    const { encuesta_id, tipo, texto, opciones } = req.body

    try {

        const encuesta = await Encuesta.findById(encuesta_id)

        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }

        if (encuesta.creador_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Esta encuesta no te pertenece' })
        }

        const nuevaPregunta = new Pregunta({
            encuesta_id,
            tipo,
            texto,
            opciones
        })

        const preguntaGuardada = await nuevaPregunta.save()

        res.status(201).json({ message: 'Pregunta creada con exito', preguta: preguntaGuardada })

    } catch (error) {
        res.status(500).json({ message: 'Error al crear pregunta', error: error.message })
    }

}

const modificarPregunta = async (req, res) => {
    const { id } = req.params
    const { tipo, texto, opciones } = req.body

    try {
        const pregunta = await Pregunta.findById(id)

        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' })
        }

        const encuesta = await Encuesta.findById(pregunta.encuesta_id)
        if (encuesta.creador_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Esta encuesta no te pertenece' })
        }

        pregunta.texto = texto || pregunta.texto
        pregunta.tipo = tipo || pregunta.tipo
        pregunta.opciones = opciones || pregunta.opciones

        const preguntaActualizada = await pregunta.save()

        res.status(200).json({ message: 'Pregunta actualizada con exito', pregunta: preguntaActualizada })

    } catch (error) {
        res.status(500).json({ message: 'Error al modificar la pregunta', error: error.message })
    }
}

const borrarPregunta = async (req, res) => {
    const { id } = req.params

    try {
        const pregunta = await Pregunta.findById(id)

        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' })
        }

        const encuesta = await Encuesta.findById(pregunta.encuesta_id)
        if (encuesta.creador_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Esta encuesta no te pertenece' })
        }

        await Pregunta.findByIdAndDelete(id)
        res.status(200).json({ message: 'Pregunta eliminada con exito' })

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la pregunta', error: error.message })
    }
}

obtenerPreguntas = async (req, res) => {
    const { id } = req.params

    try {
        const encuesta = await Encuesta.findById(id)

        if (!encuesta) {
            res.status(404).json({ message: 'Esta encuesta no existe' })
        }

        const preguntas = await Pregunta.find({ encuesta_id: id })

        res.status(200).json(preguntas)

    } catch (error) {
        res.status(500).json({ message: 'Error al buscar las preguntas', error: error.message })
    }
}

module.exports = {
    crearPregunta,
    modificarPregunta,
    borrarPregunta,
    obtenerPreguntas
}