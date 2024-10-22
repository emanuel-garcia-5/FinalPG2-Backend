const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de Reporte
const ReporteSchema = new Schema({
    ReporteID: {
        type: String,
        required: true,
        unique: true
    },
    FechaGeneracion: {
        type: Date,
        required: true
    },
    TipoReporte: {
        type: String,
        required: true
    },
    Contenido: {
        type: String,
        required: true
    },
    Emergencia: {
        type: Schema.Types.ObjectId,
        ref: 'Emergencia',
        required: true
    },
    Usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Reporte = mongoose.model('Reporte', ReporteSchema);

// Exportar el modelo de Reporte
module.exports = Reporte
