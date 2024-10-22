const { response } = require('express')

const { Vehiculo } = require('../models')

const vehiculosGet = async (req, res = response) => {
    try {
        const vehiculos = await Vehiculo.find();
        res.status(200).json(vehiculos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const vehiculoGet = async (req, res = response) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json(vehiculo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const vehiculoPost = async (req, res = response) => {
    const { TipoVehiculo, Matricula, Capacidad, Estado} = req.body;

    const nuevoVehiculo = new Vehiculo({
        TipoVehiculo,
        Matricula,
        Capacidad,
        Estado
    });

    try {
        const vehiculoGuardado = await nuevoVehiculo.save();
        res.status(201).json(vehiculoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const vehiculoPut = async (req, res = response) => {
    const { TipoVehiculo, Matricula, Capacidad, Estado  } = req.body;

    try {
        const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
            req.params.id,
            { TipoVehiculo, Matricula, Capacidad, Estado },
            { new: true } // Retorna el documento actualizado
        );

        if (!vehiculoActualizado) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        res.status(200).json(vehiculoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const vehiculoDelete = async (req, res = response) => {
    try {
        const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);

        if (!vehiculoEliminado) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        res.status(200).json({ message: 'Vehículo eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    vehiculosGet,
    vehiculoGet,
    vehiculoPost,
    vehiculoPut,
    vehiculoDelete
}