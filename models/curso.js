const {Schema, model} = require('mongoose');

const cursoSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    catedratico:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    mienbros: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ]
        
    
 
});

// usuarioSchema.methods.toJSON = function () {
//     const {__v, password, ...usuario} = this.toObject();
//     return usuario;
// }

module.exports = model('Curso', cursoSchema);