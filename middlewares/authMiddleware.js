// middlewares/authMiddleware.js
function authMiddleware(req, res, next) {
  if (req.isAuthenticated()) { // Verifica se o usuário está autenticado
      return next(); // Usuário autenticado, permite o acesso à próxima rota
  }
  res.redirect('/'); // Usuário não autenticado, redireciona para a página de login
}

module.exports = authMiddleware;

  