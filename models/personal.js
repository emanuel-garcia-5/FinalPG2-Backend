const mongoose = require('mongoose');

// Esquema para Personal
const personalSchema = new mongoose.Schema({
    Nombre: String,
    Apellido: String,
    Rol: String,
    Telefono: String,
    Correo: String,
    Estado: String
});

const Personal = mongoose.model('Personal', personalSchema);

module.exports = Personal;