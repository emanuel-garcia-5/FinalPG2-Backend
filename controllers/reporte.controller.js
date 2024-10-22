const { response } = require('express')

const { Reporte } = require('../models')

const reportesGet = async (req, res = response) => {
    try {
        const reportes = await Reporte.find();
        res.status(200).json(reportes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const reporteGet = async (req, res = response) => {
    try {
        const reporte = await Reporte.findById(req.params.id);
        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.status(200).json(reporte);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const reportePost = async (req, res = response) => {
    const { ReporteID, FechaGeneracion, TipoReporte, Contenido } = req.body;

    const nuevoReporte = new Reporte({
        ReporteID,
        FechaGeneracion,
        TipoReporte,
        Contenido
    });

    try {
        const reporteGuardado = await nuevoReporte.save();
        res.status(201).json(reporteGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const reportePut = async (req, res = response) => {
    const { FechaGeneracion, TipoReporte, Contenido } = req.body;

    try {
        const reporteActualizado = await Reporte.findByIdAndUpdate(
            req.params.id,
            { FechaGeneracion, TipoReporte, Contenido },
            { new: true } // Retorna el documento actualizado
        );

        if (!reporteActualizado) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.status(200).json(reporteActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const reporteDelete = async (req, res = response) => {
    try {
        const reporteEliminado = await Reporte.findByIdAndDelete(req.params.id);

        if (!reporteEliminado) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.status(200).json({ message: 'Reporte eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    reportesGet,
    reporteGet,
    reportePost,
    reportePut,
    reporteDelete
}