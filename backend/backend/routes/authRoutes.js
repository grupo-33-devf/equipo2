// backend/routes/authRoutes.js
import express from "express";
import passport from "passport";

const router = express.Router();

// Ruta para iniciar sesión con Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Ruta de callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); // Redirige al frontend tras iniciar sesión
  }
);

// Ruta para obtener el usuario actual
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
