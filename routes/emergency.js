const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Rotas para emergências
router.get('/', emergencyController.getEmergencies);             // Listar emergências
router.get('/add', emergencyController.showAddEmergencyForm);   // Mostrar formulário de adição
router.post('/add', emergencyController.addEmergency);          // Adicionar emergência
router.get('/edit/:id', emergencyController.showEditEmergencyForm); // Mostrar formulário de edição
router.post('/edit/:id', emergencyController.editEmergency);    // Editar emergência
router.post('/delete/:id', emergencyController.deleteEmergency); // Excluir emergência

module.exports = router;
