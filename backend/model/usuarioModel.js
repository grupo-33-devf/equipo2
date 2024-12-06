//Usuario: id, nombre, email, password, oauth_provider, oauth_id, created_at, updated_at
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea tu correo'],
        unique: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            },
            message: 'El correo es invalido, favor de verificar'
        }
    },
    password: {
        type: String,
        // Esta funcion nos permite validar si hay un oauth_provider, en caso de que si
        // el password pasa a ser opcional
        required: function () {
            return !this.oauth_provider
        },
        minlength: [6, 'La contraseña debe de tener 6 o mas caracteres']
    },
    oauth_provider: {
        type: String, // Ejemplo: 'google', 'facebook'
        enum: ['google', 'facebook', 'github', ''],
        default: '',
    },
    oauth_id: {
        type: String,
        unique: true,
        sparse: true, // Esto nos permite valores nulos o vacios
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
userSchema.pre('save', function (next) {
    this.updated_at = Date.now()
    next()
})

module.exports = mongoose.model('Usuario', userSchema)