const { response } = require('express');
const {Usuario,Curso} = require('../models');



const datosTelegram = async(req, res = response)=>{

    const {correo} = req.body;

    const usuario = await Usuario.findOne({correo});

    if(!usuario){
        return res.status(400).json({
            msg: 'no hay usuario con ese correo'
        })
    }
 const cursos = await Curso.find({mienbros: usuario._id});

 const cursosList = [];

 cursos.map(curso => cursosList.push(curso.nombre))

 res.json({
     msg: 'todo ok',
    cursosList,
    nombre: usuario.nombre
 })

}

module.exports = {
    datosTelegram
}