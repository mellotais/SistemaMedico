// dao/patientDAO.js
const Patient = require('../models/patient');

class PatientDAO {
  async addPatient(patientData) {
    try {
      const patient = new Patient(patientData);
      return await patient.save();
    } catch (error) {
      throw new Error('Error while adding patient: ' + error.message);
    }
  }

  async getAllPatients() {
    try {
      return await Patient.find();
    } catch (error) {
      throw new Error('Error while fetching patients: ' + error.message);
    }
  }

  async getPatientById(id) {
    try {
      return await Patient.findById(id);
    } catch (error) {
      throw new Error('Error while fetching patient: ' + error.message);
    }
  }

  async updatePatient(id, patientData) {
    try {
      return await Patient.findByIdAndUpdate(id, patientData, { new: true });
    } catch (error) {
      throw new Error('Error while updating patient: ' + error.message);
    }
  }

  async deletePatient(id) {
    try {
      return await Patient.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error while deleting patient: ' + error.message);
    }
  }
}

module.exports = new PatientDAO();
