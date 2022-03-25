const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Conexión a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Rutas
        this.routes()
    }
    middlewares() {

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //directorio público
        this.app.use(express.static('public'));
    }

    async conectarDB(){
        await dbConnection()
    }

    routes() {
       this.app.use(this.usersPath , require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }


}

module.exports =  Server