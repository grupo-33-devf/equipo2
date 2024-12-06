
const generarUrlCorta = async (req, res) => {
    res.status(200).json({ message: 'generarUrlCorta' })
}

const generarQrCode = async (req, res) => {
    res.status(200).json({ message: 'generarQrCode' })
}

module.exports = {
    generarUrlCorta,
    generarQrCode
}