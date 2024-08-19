// models/patient.js

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
});

module.exports = mongoose.model('Patient', patientSchema);
