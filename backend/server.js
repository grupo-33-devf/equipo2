const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
require('./config/passport')

connectDB()

const app = express()

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(cors(corsOptions))
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'supersecret',
        resave: false,
        saveUninitialized: true,
    })
)

app.use(passport.initialize())
app.use(passport.session())


app.use('/api/users', require('./routes/usuariosRoutes'))
app.use('/api/encuestas', require('./routes/encuestasRoutes'))
app.use('/api/preguntas', require('./routes/preguntasRoutes'))
app.use('/api/respuestas', require('./routes/respuestasRoutes'))
app.use('/api/urls', require('./routes/urlsRoutes'))


app.use('/api/auth', require('./routes/authRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow.bold))
