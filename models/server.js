const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config.db');
const fileUpload = require('express-fileupload');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.loginPath = '/api/login';
        this.cusrsosPath = '/api/cursos';
        this.actividadesPath = '/api/actividades';
        this.respuestasPath = '/api/respuestas';
        //conectar a la base de datos 
        this.conectarDB();
        //Middlewares
        // this.app.use(express.static(__dirname + '/public'))

        this.middlewares();

        //rutas de aplicacion

        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio Publico
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {


        this.app.use(this.usuariosPath, require('../routes/user.routes'));
        this.app.use(this.loginPath, require('../routes/auth.routes'));
        this.app.use(this.cusrsosPath, require('../routes/curso.routes'));
        this.app.use(this.actividadesPath, require('../routes/actividad.routes'));
        this.app.use(this.respuestasPath, require('../routes/respuesta.routes'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto: ", this.port)
        });
    }

}

module.exports = Server;