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

        const { token, usuario_id } = req.user;

        if (!token || !usuario_id) {
            return res.redirect(`${process.env.BASE_URL}/login?error=invalid_token`);
        }


        res.redirect(`${process.env.BASE_URL}?token=${token}&usuario_id=${usuario_id}`);
    }
)

router.get('/login-failed', (req, res) => {
    res.status(401).json({ message: 'Error al iniciar sesión con Google.' });
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión.' })
        }
        res.redirect(`${process.env.BASE_URL}/login`)
    })
})

module.exports = router
