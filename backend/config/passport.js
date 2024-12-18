const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const Usuario = require('../model/usuarioModel')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                let usuario = await Usuario.findOne({ oauth_id: profile.id })

                if (!usuario) {

                    usuario = new Usuario({
                        nombre: profile.displayName,
                        email: profile.emails[0].value,
                        oauth_provider: 'google',
                        oauth_id: profile.id,
                    })

                    await usuario.save()
                }

                const token = jwt.sign(
                    { id: usuario._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )

                return done(null, { token, usuario_id: usuario._id })
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
