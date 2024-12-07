//Pregunta: id, encuesta_id, tipo, texto, opciones.
const mongoose = require('mongoose')

const preguntaSchema = new mongoose.Schema({
    encuesta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Encuesta',
        required: true,
    },
    tipo: {
        type: String,
        enum: ['opcion_multiple', 'texto'],
        required: true
    },
    texto: {
        type: String,
        required: [true, 'Por favor teclea el texto de la pregunta']
    },
    opciones: {
        type: [String], //Por el uso en opción mutiple
        default: [],
        validate: {
            validator: function (value) {
                return this.tipo !== 'texto' || value.length === 0
            },
            message: 'No se puede crear una pregunta de tipo texto con opciones'
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Pregunta', preguntaSchema)