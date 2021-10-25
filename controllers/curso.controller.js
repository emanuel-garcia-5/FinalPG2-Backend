const { response } = require("express");
const mongoose = require('mongoose')

const {Curso, Usuario} = require('../models')


const creaCurso = async(req, res = response)=>{

let {...data} = req.body;

id = req.usuario._id

data.catedratico = id;


const existeCurso =await Curso.findOne({nombre: data.nombre, catedratico:id});


if(existeCurso){

return res.status(400).json({
    msg: `el catedratico ya tiene un curso con ese nombre`
})
}

const curso = new Curso(data);

await curso.save();

res.json({curso});

}

const insertaUsuario = async(req, res = response)=>{

    const {idcurso} = req.params;
    const {correo} = req.body;
    const existeUsuario = await Usuario.findOne({correo: correo});
    if(!existeUsuario){
        return res.status(400).json({
            msg: `no existe un usuario con el correo ${correo}`
        })
    }
 const curso = await Curso.findById(idcurso);

 if(curso.mienbros.includes(existeUsuario._id)){

    return res.status(400).json({
        msg: `Ya existe un alumno con el correo ${correo} en el curso`
    })
 }

 console.log(existeUsuario)

 curso.mienbros.push(existeUsuario._id);

 await curso.save();

 res.json({
     curso
 })
}

const verCursosInfo = async (req, res = response)=>{
    
    const cursos = await Curso.find({
        $or: [{catedratico: req.usuario._id},{mienbros: req.usuario._id}]
    
    })
                 .populate('catedratico')
                 .populate('mienbros')

    res.json({
        cursos
    })

}

const verCursoInfo = async (req, res = response)=>{
    
    const cursos = await Curso.findById(req.params.id)
                 .populate('catedratico')
                 .populate('mienbros')

    res.json({
        cursos
    })

}

const borrarCurso = async (req, res = response)=>{
    
    const curso = await Curso.findByIdAndUpdate(req.params.id,{estado: false});
              
        if(!curso){
            return  res.status(400).json({
                msg: `no existe un curso con ese id`
            })
        }

    res.json({
        curso
    })

}


module.exports = {
    creaCurso,
    insertaUsuario,
    verCursosInfo,
    verCursoInfo,
    borrarCurso
}