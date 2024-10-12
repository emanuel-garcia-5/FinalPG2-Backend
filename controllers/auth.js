const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const jwt = require('jsonwebtoken');


const verifyLogin = async(req, res=response) => {

    const {'x-token':token} = req.cookies

    if(!token) return res.status(401).json({msg: "Unauthorized"});

    jwt.verify(token, process.env.SECRETORPRIVATEKEY,async (err, {uid})=>{
        if(err) return res.status(401).json({msg: "Unauthorized"});

        const userFound = await Usuario.findById(uid)

        if(!userFound) return res.status(401).json({msg: "Unauthorized"});

        return     res.json({
            usuario: {
        _id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        rol: userFound.rol,
        estado: true
    },
        })
    })


}


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        const userCount = await Usuario.countDocuments();

        if (userCount === 0) {
            const adminUser = new Usuario({
                nombre: 'Admin',
                correo: correo,
                password: password,
                rol: 'ADMIN_ROLE'
            });

            const salt = bcryptjs.genSaltSync();

            adminUser.password = bcryptjs.hashSync(password, salt);
            await adminUser.save();

            const token = await generarJWT( adminUser.id );
        res.cookie("x-token", token)

        res.json({
            adminUser,
            token
        })
            console.log('Usuario administrador creado correctamente');
        }
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                errors:[
                    {msg: 'Usuario / Password no son correctos - estado: false'}  
                  ]
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                errors:[
              {msg: 'Usuario / Password no son correctos - estado: false'}  
            ]    
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )  ;
        if ( !validPassword ) {
            return res.status(400).json({
                errors:[
                {msg: 'Usuario / Password no son correctos - estado: false'}  
              ]    
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.cookie("x-token", token, {sameSite: 'none'})
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}




module.exports = {
    login,
    verifyLogin
}
