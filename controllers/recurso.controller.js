const { response } = require('express');

const { Recurso } = require('../models');

const recursosGet = async (req, res = response) => {
    try {
        const recursos = await Recurso.find()
        res.status(200).json(recursos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const recursoGet = async (req, res = response) => {
    try {
        const recurso = await Recurso.findById(req.params.id)
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        res.status(200).json(recurso);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const recursosPost = async (req, res = response) => {
    const { RecursoID, TipoRecurso, Nombre, Estado, Descripcion } = req.body;

    const nuevoRecurso = new Recurso({
      
        TipoRecurso,
        Nombre,
        Estado,
       
        Descripcion,
        
    });

    try {
        const recursoGuardado = await nuevoRecurso.save();
        res.status(201).json(recursoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const recursosPut = async (req, res = response) => {
    const { TipoRecurso, Nombre, Estado, Descripcion } = req.body;

    try {
        const recursoActualizado = await Recurso.findByIdAndUpdate(
            req.params.id,
            { TipoRecurso, Nombre, Estado, UbicacionActual, },
            { new: true } // Retorna el documento actualizado
        );

        if (!recursoActualizado) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        res.status(200).json(recursoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const recursosDelete = async (req, res = response) => {
    try {
        const recursoEliminado = await Recurso.findByIdAndDelete(req.params.id);

        if (!recursoEliminado) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        res.status(200).json({ message: 'Recurso eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    recursoGet,
    recursosGet,
    recursosPost,
    recursosPut,
    recursosDelete
}

