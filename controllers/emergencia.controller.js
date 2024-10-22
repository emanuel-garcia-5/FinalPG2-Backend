const { response } = require('express');

const {Emergencia} = require('../models');

const getEmergencias = async (req, res) => {
    try {
      const emergencias = await Emergencia.find();
      res.json(emergencias);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener emergencias', error: err });
    }
  }

  const getEmergencia = async (req, res) => {
    try {
      const emergencia = await Emergencia.findById(req.params.id);
      if (!emergencia) {
        return res.status(404).json({ message: 'Emergencia no encontrada' });
      }
      res.json(emergencia);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener la emergencia', error: err });
    }
  }

  const postEmergencias = async (req, res) => {
    const { EmergenciaID, TipoEmergencia, Descripcion, Ubicacion, Prioridad, ReportadoPor } = req.body;
  
    const nuevaEmergencia = new Emergencia({
      EmergenciaID,
      TipoEmergencia,
      Descripcion,
      Ubicacion,
      Prioridad,
      ReportadoPor
    });
  
    try {
      const emergenciaGuardada = await nuevaEmergencia.save();
      res.status(201).json(emergenciaGuardada);
    } catch (err) {
      res.status(400).json({ message: 'Error al crear la emergencia', error: err });
    }
  }

  const putEmergencias = async (req, res) => {
    try {
      const emergenciaActualizada = await Emergencia.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Devuelve el documento actualizado
        runValidators: true // Para aplicar las validaciones del esquema
      });
  
      if (!emergenciaActualizada) {
        return res.status(404).json({ message: 'Emergencia no encontrada' });
      }
      res.json(emergenciaActualizada);
    } catch (err) {
      res.status(400).json({ message: 'Error al actualizar la emergencia', error: err });
    }
  }

  const putEmergenciasEstado = async (req, res) => {
    try {
      const emergencia = await Emergencia.findById(req.params.id);

      if(!emergencia){
        res.status(400).json({ message: 'Error al actualizar el estado de la emergencia', error: err });
      }

      const {estado} = req.body;

      emergencia.Estado = estado

      const emergenciaActualizada = await Emergencia.findByIdAndUpdate(req.params.id, emergencia, {
        new: true, // Devuelve el documento actualizado
        runValidators: true // Para aplicar las validaciones del esquema
      });
  
  
      if (!emergenciaActualizada) {
        return res.status(404).json({ message: 'Emergencia no encontrada' });
      }
      res.json(emergenciaActualizada);
    } catch (err) {
      res.status(400).json({ message: 'Error al actualizar la emergencia', error: err });
    }
  }

  const deleteEmergencia = async (req, res) => {
    try {
      const emergenciaEliminada = await Emergencia.findByIdAndDelete(req.params.id);
      if (!emergenciaEliminada) {
        return res.status(404).json({ message: 'Emergencia no encontrada' });
      }
      res.json({ message: 'Emergencia eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar la emergencia', error: err });
    }
  }

  module.exports = {
    getEmergencia,
    getEmergencias,
    postEmergencias,
    putEmergencias,
    deleteEmergencia,
    putEmergenciasEstado
}