// config/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Função para configurar Helmet no app
function setupHelmet(app) {
    app.use(helmet());
}

// Função para configurar rate limiting no app
function setupRateLimiting(app) {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100 // Limita cada IP a 100 requisições por "windowMs"
    });
    app.use(limiter);
}

// Exporta as funções para serem usadas no app.js
module.exports = {
    setupHelmet,
    setupRateLimiting
};
