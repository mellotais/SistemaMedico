// config/security.js

const mongoose = require('mongoose');
const logger = require('../logs/logger');

let isConnected = false; // Variável para armazenar o estado da conexão

const connectDB = async () => {
  if (isConnected) {
    logger.info('Já conectado ao MongoDB');
    return;
  }

  try {
    await mongoose.connect('mongodb://localhost/medical-system');
    isConnected = true;
    logger.info('Conectado ao MongoDB');
  } catch (err) {
    logger.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
};

module.exports = connectDB;
