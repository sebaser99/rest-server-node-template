const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths ={
            users: '/api/users',
            auth:   '/api/auth',
            products: '/api/products',
            categories: '/api/categories',
            buscar: '/api/buscar'
        } 
      
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
        this.app.use(this.paths.auth , require('../routes/auth'))
       this.app.use(this.paths.users , require('../routes/users'))
       this.app.use(this.paths.categories , require('../routes/categories'))
       this.app.use(this.paths.products , require('../routes/products')),
       this.app.use(this.paths.buscar, require('../routes/buscar'))
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }


}

module.exports =  Server