//Respuesta: id, pregunta_id, encuesta_id, respuesta, fecha_respuesta
const mongoose = require('mongoose')

const respuestaSchema = new mongoose.Schema({
    encuesta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Encuesta',
        required: true,
    },
    pregunta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true,
    },
    respuesta: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Por favor introduce una respuesta']
    },
    fecha_respuesta: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Respuesta', respuestaSchema)