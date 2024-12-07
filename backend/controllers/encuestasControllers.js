const Encuesta = require('../model/encuestaModel')
const Pregunta = require('../model/preguntaModel')
const Respuesta = require('../model/respuestaModel')
const QRCode = require('qrcode')

const obtenerEncuestas = async (req, res) => {
    try {
        const encuestas = await Encuesta.find();
        res.status(200).json(encuestas)
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener encuestas',
            error: error.message
        })
    }
}

const publicarEncuesta = async (req, res) => {
    const { titulo, descripcion, fecha_inicio, fecha_fin } = req.body
    try {
        const nuevaEncuesta = new Encuesta({
            titulo,
            descripcion,
            fecha_inicio,
            fecha_fin,
            creador_id: req.user.id
        })

        const encuestaGuardada = await nuevaEncuesta.save();
        res.status(201).json(encuestaGuardada)

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la encuesta', error: error.message })
    }
}

const obtenerEncuesta = async (req, res) => {

    const { id } = req.params

    try {
        const encuesta = await Encuesta.findById(id)
        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }
        res.status(200).json(encuesta)
    } catch (error) {
        res.status(500).json({ message: 'Error no se pudo obtener la encuesta', error: error.message })
    }

}

const modificarEncuesta = async (req, res) => {
    const { id } = req.params
    const datos = req.body
    try {

        const encuesta = await Encuesta.findById(id);
        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        if (encuesta.creador_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para modificar encuestas que no te pertenecen' });
        }

        const encuestaActualizada = await Encuesta.findByIdAndUpdate(id, datos, { new: true });
        res.status(200).json({ message: 'Encuesta actualizada con éxito', encuesta: encuestaActualizada });


    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la encuesta', error: error.message })
    }
}

const borrarEncuesta = async (req, res) => {
    const { id } = req.params
    try {

        const encuesta = await Encuesta.findById(id)

        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }

        if (encuesta.creador_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar encuestas que no te pertenecen' });
        }

        await Encuesta.findByIdAndDelete(id)

        res.status(200).json({ message: 'Encuesta eliminada correctamente' })

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la encuesta', error: error.message })
    }
}

const generarQr = async (req, res) => {
    const { id } = req.params
    try {
        const encuesta = await Encuesta.findById(id)

        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }

        const qrCodeData = await QRCode.toDataURL(encuesta.url)
        encuesta.qr_code = qrCodeData
        await encuesta.save()

        res.status(200).json({ message: 'QR Code generado correctamente', qrCodeData })

    } catch (error) {
        res.status(500).json({ message: 'Error no se pudo generar codigo QR', error: error.message })
    }
}

// Pendiente hasta terminar preguntas y respuestas controllers
const verResultados = async (req, res) => {
    const { id } = req.params

    try {

        const respuestas = await Respuesta.find({ encuesta_id: id }).populate('pregunta_id')

        if (!respuestas.length) {
            return res.status(404).json({ message: 'No se encontraron respuestas para esta encuesta' })
        }

        const resultados = respuestas.reduce((acc, respuesta) => {
            const pregunta = respuesta.pregunta_id.texto

            if (!acc[pregunta]) {
                acc[pregunta] = []
            }

            acc[pregunta].push(respuesta.respuesta)

            return acc
        }, {})

        res.status(200).json(resultados)

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los resultados', error: error.message })
    }

}

module.exports = {
    obtenerEncuestas,
    publicarEncuesta,
    obtenerEncuesta,
    modificarEncuesta,
    borrarEncuesta,
    generarQr,
    verResultados
}