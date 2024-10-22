const { response } = require('express');

const {ResultadoEmergencia} = require('../models');

const resultadoEmergenciasGet = async (req, res = response) => {
    try {
        const resultados = await ResultadoEmergencia.find().populate('Emergencia');
        res.status(200).json(resultados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const resultadoEmergenciaGet = async ( req, res = response) => {
    try {
        const resultado = await ResultadoEmergencia.findById(req.params.id).populate('Emergencia');
        if (!resultado) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const resultadoEmergenciaPost = async (req, res = response) =>{
    const { ResultadoID, FechaHoraFin, Resultado, RecursosUtilizados, Comentarios, Emergencia } = req.body;

    const nuevoResultado = new ResultadoEmergencia({
        ResultadoID,
        FechaHoraFin,
        Resultado,
        RecursosUtilizados,
        Comentarios,
        Emergencia
    });

    try {
        const resultadoGuardado = await nuevoResultado.save();
        res.status(201).json(resultadoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const resultadoEmergenciaPut = async (req, res = response) => {
    const { FechaHoraFin, Resultado, RecursosUtilizados, Comentarios, Emergencia } = req.body;

    try {
        const resultadoActualizado = await ResultadoEmergencia.findByIdAndUpdate(
            req.params.id,
            { FechaHoraFin, Resultado, RecursosUtilizados, Comentarios, Emergencia },
            { new: true } // Retorna el documento actualizado
        );

        if (!resultadoActualizado) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }

        res.status(200).json(resultadoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const resultadoEmergenciaDelete = async () =>{
    try {
        const resultadoEliminado = await ResultadoEmergencia.findByIdAndDelete(req.params.id);

        if (!resultadoEliminado) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }

        res.status(200).json({ message: 'Resultado eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    resultadoEmergenciasGet,
    resultadoEmergenciaGet,
    resultadoEmergenciaPost,
    resultadoEmergenciaPut,
    resultadoEmergenciaDelete
}