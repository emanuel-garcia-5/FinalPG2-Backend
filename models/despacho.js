const mongoose = require('mongoose');

const despachoSchema = new mongoose.Schema({
    fechaHoraDespacho: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'EN_CAMINO', 'FINALIZADO', 'CANCELADO'],
        default: 'PENDIENTE'
    },
    VehiculosAsignados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehiculo'
    }],
    Recursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recurso'
    }],
    Personal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personal'
    }]
});

const Despacho = mongoose.model('Despacho', despachoSchema);

module.exports = Despacho;