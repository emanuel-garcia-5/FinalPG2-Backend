const { response } = require('express');

const { Personal } = require('../models');

const personalesGet = async (req, res = response) => {
    try {
        const personal = await Personal.find();
        res.status(200).json(personal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const personalGet = async (req, res = response) => {
    try {
        const personal = await Personal.findById(req.params.id);
        if (!personal) {
            return res.status(404).json({ message: 'Miembro del personal no encontrado' });
        }
        res.status(200).json(personal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const personalPost = async (req, res = response) => {
    const { Nombre, Apellido, Rol, Telefono, Correo, Estado } = req.body;

    console.log(req.body)

    const nuevoPersonal = new Personal({
        Nombre,
        Apellido,
        Rol,
        Telefono,
        Correo,
        Estado
    });

    try {
        const personalGuardado = await nuevoPersonal.save();
        
        res.status(201).json(personalGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const personalPut = async (req, res = response) => {
    const { Nombre, Apellido, Rol, Telefono, Correo, Estado } = req.body;

    try {
        const personalActualizado = await Personal.findByIdAndUpdate(
            req.params.id,
            { Nombre, Apellido, Rol, Telefono, Correo, Estado },
            { new: true } // Retorna el documento actualizado
        );

        if (!personalActualizado) {
            return res.status(404).json({ message: 'Miembro del personal no encontrado' });
        }

        res.status(200).json(personalActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const personalDelete = async (req, res = response) => {
    try {
        const personalEliminado = await Personal.findByIdAndDelete(req.params.id);

        if (!personalEliminado) {
            return res.status(404).json({ message: 'Miembro del personal no encontrado' });
        }

        res.status(200).json({ message: 'Miembro del personal eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    personalesGet,
    personalGet,
    personalPost,
    personalPut,
    personalDelete
}
