const mongoose = require('mongoose');

// Esquema para la colección intermedia (join collection)

const recursoSchema = new mongoose.Schema({
    TipoRecurso: {
        type: String,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Estado: {
        type: String,
        enum: ['Disponible', 'Ocupado',], // Puedes agregar más estados
        default: 'Disponible'
    },
    Descripcion: {
        type: String
    },
    Despachos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Despacho'
    }]
});


const Recurso = mongoose.model('Recurso', recursoSchema);

module.exports = Recurso

// Esquema para Despacho (asumiendo que ya existe)
// ... (aquí iría el esquema de Despacho con la relación inversa)

// Relación inversa en Despacho (ejemplo)
