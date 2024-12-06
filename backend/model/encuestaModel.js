//Encuesta: id, titulo, descripcion, creador_id , fecha_inicio, fecha_fin, is_abierta, url, qr_code
const mongoose = require('mongoose')

const encuestaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Por favor teclea el titulo']
    },
    descripcion: {
        type: String
    },
    creador_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fecha_inicio: {
        type: Date,
        default: Date.now
    },
    fecha_fin: {
        type: Date,
        required: [true, 'Por favor teclea una fecha final'],
        validate: {
            validator: function (fecha) {
                return fecha > this.fecha_inicio;
            },
            message: 'La fecha final es menor a la fecha de inicio'
        }
    },
    is_abierta: {
        type: Boolean,
        default: true
    },
    url: {
        type: String,
        required: false,
        validate: {
            validator: function (url) {
                return /^https?:\/\/[^\s]+/.test(url);
            },
            message: 'La URL debe tener un formato valido'
        }
    },
    qr_code: {
        type: String,
        default: '',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

//Actualización automatica de updated_at
encuestaSchema.pre('save', function (next) {
    this.updated_at = Date.now()
    next()
})


module.exports = mongoose.model('Encuesta', encuestaSchema)