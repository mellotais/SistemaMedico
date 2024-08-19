const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const flash = require('connect-flash');
require('dotenv').config();
require('./config/auth'); // Configuração de autenticação do Passport
const connectDB = require('./config/db');
const logger = require('./logs/logger');

const app = express();

// Conectar ao MongoDB
connectDB();

// Configurações de segurança
app.use(helmet());

// Configurar EJS como motor de templates
app.set('view engine', 'ejs');

// Middleware para parsing de dados do body
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static('public'));

// Configuração de sessões
app.use(session({
  secret: process.env.SESSION_SECRET || 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false
}));


// Inicializar o Passport
app.use(passport.initialize());
app.use(passport.session());

// Inicializar o flash
app.use(flash());

// Middleware para tornar mensagens flash disponíveis em todas as respostas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Rotas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/doctors', require('./routes/doctor'));
app.use('/patients', require('./routes/patient'));
app.use('/emergencies', require('./routes/emergency'));

// Logger para registrar erros não tratados
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
