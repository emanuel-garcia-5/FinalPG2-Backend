

const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');
const Curso = require('./curso');
const Actividad = require('./actividad');
const Respuesta = require('./respuesta');
const Email = require('./mail');



module.exports = {

    Role,
    Server,
    Usuario,
    Curso,
    Actividad,
    Respuesta,
    ...Email
}

