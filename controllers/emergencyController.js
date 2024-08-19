const EmergencyCase = require('../models/emergencyCase');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

// Listar casos de emergência
exports.getEmergencies = async (req, res) => {
    try {
        const emergencies = await EmergencyCase.find().populate('patient').populate('doctor');
        console.log(emergencies);  
        res.render('emergencies/list', { emergencies });
    } catch (err) {
        console.error('Erro ao listar casos de emergência:', err);
        res.status(500).send('Erro ao listar casos de emergência');
    }
};


// Mostrar formulário de adição de caso de emergência
exports.showAddEmergencyForm = async (req, res) => {
    try {
        const patients = await Patient.find();
        const doctors = await Doctor.find();
        res.render('emergencies/add', { patients, doctors });
    } catch (err) {
        console.error('Erro ao mostrar formulário de adição de caso de emergência:', err);
        res.status(500).send('Erro ao mostrar formulário de adição de caso de emergência');
    }
};

// Adicionar caso de emergência
exports.addEmergency = async (req, res) => {
    try {
        const { description, patient, doctor } = req.body;
        const newEmergency = new EmergencyCase({ description, patient, doctor });
        await newEmergency.save();
        res.redirect('/emergencies');
    } catch (err) {
        console.error('Erro ao adicionar caso de emergência:', err);
        res.status(500).send('Erro ao adicionar caso de emergência');
    }
};

// Mostrar formulário de edição de caso de emergência
exports.showEditEmergencyForm = async (req, res) => {
    try {
        const emergency = await EmergencyCase.findById(req.params.id).populate('patient').populate('doctor');
        const patients = await Patient.find();
        const doctors = await Doctor.find();
        if (!emergency) {
            return res.status(404).send('Caso de emergência não encontrado');
        }
        res.render('emergencies/edit', { emergency, patients, doctors });
    } catch (err) {
        console.error('Erro ao mostrar formulário de edição de caso de emergência:', err);
        res.status(500).send('Erro ao mostrar formulário de edição de caso de emergência');
    }
};

// Editar caso de emergência
exports.editEmergency = async (req, res) => {
    try {
        const { description, patient, doctor } = req.body;
        await EmergencyCase.findByIdAndUpdate(req.params.id, { description, patient, doctor });
        res.redirect('/emergencies');
    } catch (err) {
        console.error('Erro ao editar caso de emergência:', err);
        res.status(500).send('Erro ao editar caso de emergência');
    }
};

// Excluir caso de emergência
exports.deleteEmergency = async (req, res) => {
    try {
        await EmergencyCase.findByIdAndDelete(req.params.id);
        res.redirect('/emergencies');
    } catch (err) {
        console.error('Erro ao excluir caso de emergência:', err);
        res.status(500).send('Erro ao excluir caso de emergência');
    }
};
