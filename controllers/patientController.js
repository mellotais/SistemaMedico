const Patient = require('../models/patient');

// Listar pacientes
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('patients/list', { patients });
    } catch (err) {
        console.error('Erro ao listar pacientes:', err);
        res.status(500).send('Erro ao listar pacientes');
    }
};

// Mostrar formulário de adição de paciente
exports.showAddPatientForm = (req, res) => {
    res.render('patients/add');
};

// Adicionar paciente
exports.addPatient = async (req, res) => {
    try {
        const { name, birthDate, email, phoneNumber, address, age } = req.body;
        
        const newPatient = new Patient({ name, birthDate, email, phoneNumber, address, age });
       
        await newPatient.save();
        
        res.redirect('/patients');
    } catch (err) {
        console.error('Erro ao adicionar paciente:', err);
        res.status(500).send('Erro ao adicionar paciente');
    }
};

// Mostrar formulário de edição de paciente
exports.showEditPatientForm = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send('Paciente não encontrado');
        }
        res.render('patients/edit', { patient });
    } catch (err) {
        console.error('Erro ao mostrar formulário de edição de paciente:', err);
        res.status(500).send('Erro ao mostrar formulário de edição de paciente');
    }
};
exports.editPatient = async (req, res) => {
    try {
        const { name, birthDate, email, phoneNumber, address, age } = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { name, birthDate, email, phoneNumber, address, age },
            { new: true, runValidators: true } // Opções para retornar o documento atualizado e garantir validações
        );

        if (!updatedPatient) {
            return res.status(404).send('Paciente não encontrado');
        }

        res.redirect('/patients');
    } catch (err) {
        console.error('Erro ao editar paciente:', err);
        res.status(500).send('Erro ao editar paciente');
    }
};


// Excluir paciente
exports.deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.redirect('/patients');
    } catch (err) {
        console.error('Erro ao excluir paciente:', err);
        res.status(500).send('Erro ao excluir paciente');
    }
};
