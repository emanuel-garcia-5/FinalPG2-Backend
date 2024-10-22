const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de Resultado de Emergencia
const ResultadoEmergenciaSchema = new Schema({
    FechaHoraFin: {
        type: Date,
        required: true
    },
    Resultado: {
        type: String,
        required: true
    },
    RecursosUtilizados: {
        type: [String], // Lista de recursos utilizados
        required: true
    },
    Comentarios: {
        type: String
    },
    Emergencia: {
        type: Schema.Types.ObjectId,
        ref: 'Emergencia',
        required: true
    }
});

const Resultado = mongoose.model('ResultadoEmergencia', ResultadoEmergenciaSchema);

// Exportar el modelo de Resultado de Emergencia
module.exports = Resultado
