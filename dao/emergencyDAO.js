// dao/emergencyDAO.js
const EmergencyCase = require('../models/emergencyCase');

class EmergencyDAO {
  async addEmergencyCase(emergencyData) {
    try {
      const emergencyCase = new EmergencyCase(emergencyData);
      return await emergencyCase.save();
    } catch (error) {
      throw new Error('Error while adding emergency case: ' + error.message);
    }
  }

  async getAllEmergencyCases() {
    try {
      return await EmergencyCase.find().populate('patient doctor');
    } catch (error) {
      throw new Error('Error while fetching emergency cases: ' + error.message);
    }
  }

  async getEmergencyCaseById(id) {
    try {
      return await EmergencyCase.findById(id).populate('patient doctor');
    } catch (error) {
      throw new Error('Error while fetching emergency case: ' + error.message);
    }
  }

  async updateEmergencyCase(id, emergencyData) {
    try {
      return await EmergencyCase.findByIdAndUpdate(id, emergencyData, { new: true }).populate('patient doctor');
    } catch (error) {
      throw new Error('Error while updating emergency case: ' + error.message);
    }
  }

  async deleteEmergencyCase(id) {
    try {
      return await EmergencyCase.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error while deleting emergency case: ' + error.message);
    }
  }
}

module.exports = new EmergencyDAO();
