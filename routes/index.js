const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const patientController = require('../controllers/patientController');
const emergencyController = require('../controllers/emergencyController');
const indexController = require('../controllers/indexController');

const authMiddleware = require('../middlewares/authMiddleware');

// Rota para a página inicial
router.get('/', indexController.home);

router.get('/login', (req, res) => {
  res.render('login'); 
});


router.get('/apresentacao', authMiddleware, (req, res) => {
  res.render('apresentacao');
});

// Rotas para médicos
router.get('/doctors', doctorController.getDoctors);
router.get('/doctors/add', doctorController.showAddDoctorForm);
router.post('/doctors/add', doctorController.addDoctor);
router.get('/doctors/edit/:id', doctorController.showEditDoctorForm);
router.post('/doctors/edit/:id', doctorController.editDoctor);
router.post('/doctors/delete/:id', doctorController.deleteDoctor);

// Rotas para pacientes
router.get('/patients', patientController.getPatients);
router.get('/patients/add', patientController.showAddPatientForm);
router.post('/patients/add', patientController.addPatient);
router.get('/patients/edit/:id', patientController.showEditPatientForm);
router.post('/patients/edit/:id', patientController.editPatient);
router.post('/patients/delete/:id', patientController.deletePatient);

// Rotas para casos de pronto-socorro
router.get('/emergencies', emergencyController.getEmergencies);
router.get('/emergencies/add', emergencyController.showAddEmergencyForm);
router.post('/emergencies/add', emergencyController.addEmergency);
router.get('/emergencies/edit/:id', emergencyController.showEditEmergencyForm);
router.post('/emergencies/edit/:id', emergencyController.editEmergency);
router.post('/emergencies/delete/:id', emergencyController.deleteEmergency);

module.exports = router;
