const express = require('express')
const router = express.Router()

/*
const { 
    generarUrlCorta, 
    generarQrCode 
} = require('../controllers/urlsControllers')
*/

// Función para generar una url acortada
router.get('/:encuestaId/short_url', generarUrlCorta)

// Función para generar un codigo QR
router.get('/:encuestaId/qr-code', generarQrCode)


module.exports = router