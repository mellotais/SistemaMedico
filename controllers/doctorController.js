const Doctor = require('../models/doctor');

// Listar médicos
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.render('doctors/list', { doctors });
    } catch (err) {
        console.error('Erro ao listar médicos:', err);
        res.status(500).send('Erro ao listar médicos');
    }
};


// Mostrar formulário de adição de médico
exports.showAddDoctorForm = (req, res) => {
    res.render('doctors/add');
};

// Adicionar médico
exports.addDoctor = async (req, res) => {
    try {
        const { name, email, phoneNumber, specialty } = req.body;
        const newDoctor = new Doctor({ name, email, phoneNumber, specialty });
        await newDoctor.save();
        res.redirect('/doctors');
    } catch (err) {
        console.error('Erro ao adicionar médico:', err);
        res.status(500).send('Erro ao adicionar médico');
    }
};


// Mostrar formulário de edição de médico
exports.showEditDoctorForm = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).send('Médico não encontrado');
        }
        res.render('doctors/edit', { doctor });
    } catch (err) {
        console.error('Erro ao mostrar formulário de edição de médico:', err);
        res.status(500).send('Erro ao mostrar formulário de edição de médico');
    }
};

// Editar médico
exports.editDoctor = async (req, res) => {
    try {
        const { name, email, phoneNumber, specialty } = req.body;
        // Adicione o { new: true } para retornar o documento atualizado
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, 
            { name, email, phoneNumber, specialty }, { new: true });
        
        if (!updatedDoctor) {
            return res.status(404).send('Médico não encontrado');
        }

        res.redirect('/doctors');
    } catch (err) {
        console.error('Erro ao editar médico:', err);
        res.status(500).send('Erro ao editar médico');
    }
};

// Excluir médico
exports.deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.redirect('/doctors');
    } catch (err) {
        console.error('Erro ao excluir médico:', err);
        res.status(500).send('Erro ao excluir médico');
    }
};
