// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Função para o callback do Google
exports.googleAuthCallback = async (profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    } else {
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName
      });
      await user.save();
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
};

// Rota de login com formulário
exports.showLoginForm = (req, res) => {
  res.render('login', { loginError: req.flash('error') });
};

// Processar login com credenciais tradicionais
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true // Habilita flash messages
  })(req, res, next);
};

