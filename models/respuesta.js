const {Schema, model} = require('mongoose');

const respuestaSchema = Schema({

  
    actividad:{
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        require: true
    },
    estudiante:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    resp:{
        type: String,
        require: true
    },
    src:{
        type: String,
        require: true,
        default:''
    },
    nota: {
        type: String,
        require: true,
        default: '0'
    }
    
        
    
 
});

module.exports = model('Respuesta', respuestaSchema);