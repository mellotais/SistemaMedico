// routes/doctor.js, routes/patient.js, routes/emergency.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar o middleware de autenticação às rotas protegidas
router.use(authMiddleware);

// Suas rotas protegidas aqui
router.get('/', (req, res) => {
  res.render('/apresentacao');
});


module.exports = router;
