// dao/doctorDAO.js
const Doctor = require('../models/doctor');

class DoctorDAO {
  // Método para adicionar um novo médico
  async addDoctor(doctorData) {
    try {
      const doctor = new Doctor(doctorData);
      return await doctor.save();
    } catch (error) {
      throw new Error('Error while adding doctor: ' + error.message);
    }
  }

  // Método para listar todos os médicos
  async getAllDoctors() {
    try {
      return await Doctor.find();
    } catch (error) {
      throw new Error('Error while fetching doctors: ' + error.message);
    }
  }

  // Método para buscar um médico por ID
  async getDoctorById(id) {
    try {
      return await Doctor.findById(id);
    } catch (error) {
      throw new Error('Error while fetching doctor: ' + error.message);
    }
  }

  // Método para atualizar um médico por ID
  async updateDoctor(id, doctorData) {
    try {
      return await Doctor.findByIdAndUpdate(id, doctorData, { new: true });
    } catch (error) {
      throw new Error('Error while updating doctor: ' + error.message);
    }
  }

  // Método para remover um médico por ID
  async deleteDoctor(id) {
    try {
      return await Doctor.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error while deleting doctor: ' + error.message);
    }
  }
}

module.exports = new DoctorDAO();
