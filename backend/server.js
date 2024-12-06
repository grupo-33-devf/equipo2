const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/*
app.use('/api/users', require('./routes/usuariosRoutes'))
app.use('/api/encuestas', require('./routes/encuestasRoutes'))
app.use('/api/preguntas', require('./routes/preguntasRoutes'))
app.use('/api/respuestas', require('./routes/respuestasRoutes'))
app.use('/api/urls', require('./routes/urlsRoutes'))
*/

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))