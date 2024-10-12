const mongoose = require('mongoose');

const emergenciaSchema = new mongoose.Schema({
    TipoEmergencia: {
        type: String,
        enum: ['Incendio', 'Accidente', 'Otro'], // Puedes agregar más tipos aquí
        required: true
    },
    Descripción: {
        type: String,
        required: true
    },
    FechaHoraReporte: {
        type: Date,
        default: Date.now
    },
    Ubicación: {
        type: String,
        required: true
    },
    Estado: {
        type: String,
        enum: ['Pendiente', 'En proceso', 'Resuelto', 'Cancelado'],
        default: 'Pendiente'
    },
    Prioridad: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    ReportadoPor: {
        type: String, // Puedes usar ObjectId para referenciar a un usuario si tienes un modelo de usuario
        required: true
    }
});

const Emergencia = mongoose.model('Emergencia', emergenciaSchema);

module.exports = Emergencia;