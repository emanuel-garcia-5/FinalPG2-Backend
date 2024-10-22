

const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');

const Email = require('./mail');
const Emergencia = require('./emergencia');
const Despacho = require('./despacho');
const Personal = require('./personal');
const Reporte = require('./reporte');
const Resultado = require('./resultado');
const Vehiculo = require('./vehiculo');
const Recurso = require('./recurso')



module.exports = {
    Role,
    Server,
    Usuario,
    Emergencia,
    Despacho,
    Emergencia,
    Personal,
    Recurso,
    Reporte,
    Resultado,
    Vehiculo,
    ...Email
}

