// logs/logger.js
const { createLogger, transports, format } = require('winston');
const path = require('path');

// Cria um logger com configurações básicas
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'system.log'),
      level: 'info'
    }),
    new transports.Console({
      level: 'debug'
    })
  ]
});

module.exports = logger;
