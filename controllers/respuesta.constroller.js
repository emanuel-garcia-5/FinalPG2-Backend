const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { Respuesta} = require('../models')


const creaRespuesta = async(req, res= response) =>{

    const {idactividad, resp} = req.body;

    const data = {

        estudiante: req.usuario._id,
        actividad: idactividad,
        resp
    }

    console.log(req.files)

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    const respuesta = new Respuesta(data);

    respuesta.src = secure_url;

    await respuesta.save();


    
    res.json({
        respuesta
    })

    
}

const obtnerRespuestas = async(req, res = response) =>{

   const {idactividad} = req.params;

   const respuestas = await Respuesta.find({actividad: idactividad})
                    .populate('actividad','nombre')
                    .populate('estudiante','nombre');

    res.json({
        respuestas
    })


}

const obtnerRespuestasNota = async(req, res = response) =>{

  
 
    const respuestas = await Respuesta.find({estudiante: req.usuario._id})
                     .populate('actividad','nombre')
                     .populate('estudiante','nombre');

    
 
     res.json({
         respuestas
     })
 
 
 }

module.exports ={
    creaRespuesta,
    obtnerRespuestas,
    obtnerRespuestasNota
}