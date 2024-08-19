// routes/doctor.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Rotas para médicos
router.get('/', doctorController.getDoctors);           // Listar médicos
router.get('/add', doctorController.showAddDoctorForm); // Mostrar formulário de adição
router.post('/add', doctorController.addDoctor);        // Adicionar médico
router.get('/edit/:id', doctorController.showEditDoctorForm); // Mostrar formulário de edição
router.post('/edit/:id', doctorController.editDoctor);  // Editar médico
router.post('/delete/:id', doctorController.deleteDoctor); // Excluir médico

module.exports = router;


