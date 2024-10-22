const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de Vehículo
const VehiculoSchema = new Schema({
    TipoVehiculo: {
        type: String,
        required: true
    },
    Matricula: {
        type: String,
        required: true,
    },
    Capacidad: {
        type: Number,
        required: true
    },
    Estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
});

const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema);

// Exportar el modelo de Vehículo
module.exports = Vehiculo
