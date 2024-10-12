

const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');
//const Curso = require('./curso');
//const Actividad = require('./actividad');
//const Respuesta = require('./respuesta');
const Email = require('./mail');
const Emergencia = require('./emergencia');



module.exports = {

    Role,
    Server,
    Usuario,
    Emergencia,
  //  Curso,
   // Actividad,
  //  Respuesta,
    ...Email
}

