// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Rota para a página de login com formulário
router.get('/login', authController.showLoginForm);

// Rota para processar o login com credenciais tradicionais
router.post('/login', authController.login);

// Rota para iniciar o login com o Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de callback após o Google autenticar o usuário
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Autenticação bem-sucedida, redireciona para a página inicial
    res.redirect('/apresentacao');
  }
);

// Rota para logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;

