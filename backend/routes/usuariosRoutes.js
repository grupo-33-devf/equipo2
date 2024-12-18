const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    register,
    login,
    oauth,
    logout,
} = require('../controllers/usuariosControllers');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    oauth
);

module.exports = router;
