const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Rotas para pacientes
router.get('/', patientController.getPatients);               // Listar pacientes
router.get('/add', patientController.showAddPatientForm);     // Mostrar formulário de adição
router.post('/add', patientController.addPatient);            // Adicionar paciente
router.get('/edit/:id', patientController.showEditPatientForm); // Mostrar formulário de edição
router.post('/edit/:id', patientController.editPatient);      // Editar paciente
router.post('/delete/:id', patientController.deletePatient);  // Excluir paciente

module.exports = router;

