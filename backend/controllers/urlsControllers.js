const Encuesta = require('../model/encuestaModel')
const TinyURL = require('tinyurl')
const QRCode = require('qrcode')

const generarUrlCorta = async (req, res) => {
    const { encuestaId } = req.params

    console.log(encuestaId);

    try {
        const encuesta = await Encuesta.findById(encuestaId)

        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }

        const urlNormal = `${process.env.BASE_URL || 'http://localhost:5000'}/encuestas/${encuestaId}`
        const urlAcortada = await TinyURL.shorten(urlNormal)

        encuesta.url = urlAcortada

        await encuesta.save()

        res.status(200).json({ message: 'URL corta generada con TinyURL', urlAcortada })
    } catch (error) {
        res.status(500).json({ message: 'Error al generar URL corta', error })
    }
}

const generarQrCode = async (req, res) => {

    const { encuestaId } = req.params

    try {
        const encuesta = await Encuesta.findById(encuestaId)

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

module.exports = {
    generarUrlCorta,
    generarQrCode
}