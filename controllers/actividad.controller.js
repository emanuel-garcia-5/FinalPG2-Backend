const { response } = require("express");


// const UploadClient =  require('@uploadcare/upload-client')

// const client = new UploadClient({ publicKey: process.env.UPLOADCARE_KEY })

const {Actividad, Respuesta} = require('../models')


const creaActividad = async (req, res= response)=>{

    let {nombre, idcurso} = req.body;

    const curso = idcurso;

    

    const actividad = new Actividad({nombre, curso});

    await actividad.save();

    res.json({
        actividad 
    })

}


module.exports = {
    creaActividad
}