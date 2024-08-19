// models/emergencyCase.js
const mongoose = require('mongoose');

const emergencyCaseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
});

module.exports = mongoose.model('EmergencyCase', emergencyCaseSchema);
