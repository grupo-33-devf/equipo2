const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/auth/login-failed' }),
    (req, res) => {
        const { token, usuario_id } = req.user


        if (!token || !usuario_id) {
            console.error('Error: Token o usuario_id no proporcionados')
            return res.redirect(`${process.env.BASE_URL}/login?error=invalid_token`)
        }


        const redirectUrl = `${process.env.BASE_URL}?token=${token}&usuario_id=${usuario_id}`
        console.log(`Redirigiendo a: ${redirectUrl}`)
        res.redirect(redirectUrl)
    }
)

router.get('/login-failed', (req, res) => {
    console.error('Error al iniciar sesión con Google')
    res.status(401).json({ message: 'Error al iniciar sesión con Google.' })
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err)
            return res.status(500).json({ message: 'Error al cerrar sesión.' })
        }

        const logoutRedirect = `${process.env.BASE_URL}/login`
        console.log(`Cerrando sesión y redirigiendo a: ${logoutRedirect}`)
        res.redirect(logoutRedirect)
    })
})

module.exports = router
