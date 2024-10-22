const { response } = require('express');

const {Despacho} = require('../models');

const despachosGet = async (req, res = response) =>{
    try {
        const despachos = await Despacho.find();
        res.status(200).json(despachos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const despachoGet = async (req, res = response) =>{
    try {
        const despacho = await Despacho.findById(req.params.id);
        if (!despacho) {
            return res.status(404).json({ message: 'Despacho no encontrado' });
        }
        res.status(200).json(despacho);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const despachosPost = async (req, res = response) =>{
    const {  FechaHoraDespacho, Estado, VehiculosAsignados, Recursos, Personal } = req.body;

    const nuevoDespacho = new Despacho({
        FechaHoraDespacho,
        Estado,
        VehiculosAsignados, 
        Recursos, 
        Personal
    });

    try {
        const despachoGuardado = await nuevoDespacho.save();
        res.status(201).json(despachoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const despachosPut = async (req, res = response) =>{
    const { FechaHoraDespacho, Estado, Emergencia } = req.body;

    try {
        const despachoActualizado = await Despacho.findByIdAndUpdate(
            req.params.id,
            { FechaHoraDespacho, Estado, Emergencia },
            { new: true } // Retorna el documento actualizado
        );

        if (!despachoActualizado) {
            return res.status(404).json({ message: 'Despacho no encontrado' });
        }

        res.status(200).json(despachoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const despachosDelete = async (req, res = response) =>{
    try {
        const despachoEliminado = await Despacho.findByIdAndDelete(req.params.id);

        if (!despachoEliminado) {
            return res.status(404).json({ message: 'Despacho no encontrado' });
        }

        res.status(200).json({ message: 'Despacho eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    despachoGet,
    despachosGet,
    despachosPost,
    despachosPut,
    despachosDelete
}