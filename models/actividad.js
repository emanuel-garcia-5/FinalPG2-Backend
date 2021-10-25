const {Schema, model} = require('mongoose');

const actividadSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    curso:{
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        require: true
    },
    estado:{
        type: Boolean,
        default: true
    },
        
    
 
});

module.exports = model('Actividad', actividadSchema);