const Respuesta = require('../model/respuestaModel')
const Pregunta = require('../model/preguntaModel')
const Encuesta = require('../model/encuestaModel')

const responder = async (req, res) => {
    const { encuesta_id, pregunta_id, respuesta } = req.body

    try {

        const encuesta = await Encuesta.findById(encuesta_id)
        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }

        const pregunta = await Pregunta.findById(pregunta_id)
        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' })
        }

        if (!encuesta.is_abierta || new Date() > new Date(encuesta.fecha_fin)) {
            return res.status(400).json({ message: 'La encuesta esta cerrada' })
        }

        const nuevaRespuesta = new Respuesta({
            encuesta_id,
            pregunta_id,
            respuesta
        })

        const respuestaGuardada = await nuevaRespuesta.save()
        res.status(201).json({ message: 'Respuesta guardada con exito', respuesta: respuestaGuardada })

    } catch (error) {

        res.status(500).json({ message: 'Error al registrar la respuesta', error: error.message })

    }
}

const obtenerRespuestas = async (req, res) => {
    const { id } = req.params;

    try {

        const encuesta = await Encuesta.findById(id);
        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        const respuestas = await Respuesta.find({ encuesta_id: id }).populate('pregunta_id', 'texto');
        if (respuestas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron respuestas para esta encuesta' });
        }

        const respuestasAgrupadas = respuestas.reduce((acc, resp) => {
            const preguntaTexto = resp.pregunta_id.texto;
            if (!acc[preguntaTexto]) {
                acc[preguntaTexto] = [];
            }
            acc[preguntaTexto].push(resp.respuesta);
            return acc;
        }, {});

        res.status(200).json({ message: 'Respuestas obtenidas con éxito', respuestas: respuestasAgrupadas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las respuestas', error: error.message });
    }
}

module.exports = {
    responder,
    obtenerRespuestas
}