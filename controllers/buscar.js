const { response } = require("express")
const { User, Category, Product } = require("../models")
const {ObjectId} = require('mongoose').Types

const coleccionesPermitidas = [
    "categorias",
    "usuarios",
    "productos",
    "roles"
]


const buscarUsuario = async(termino, res = response)=> {
    try{ 
        const esMongoId =  ObjectId.isValid(termino)

        if(esMongoId){
            const usuario = await User.findById(termino)
            return res.status(200).json({
                msg: "Usuario",
                results: (usuario) ? [usuario] : []
            })
        }
        const regex = new RegExp(termino, 'i'); 
        const [total, usuarios] = await Promise.all([
            User.count({
                $or: [{nombre: regex}, {email: regex}],
                $and: [{estado: true}]
            }),
            User.find({
                $or: [{nombre: regex}, {email: regex}],
                $and: [{estado: true}]
            })
        ])
        return res.status(200).json({
            msg: (total > 1)? "Usuarios" : "Usuario",
            total,
            usuarios
        }) 
    } catch(err){
        console.log(err)
        return res.status(500).json({
            msg: "No se pudo realizar la búsqueda, consulte con el admin"
        })
    }
}

const buscarCategorias = async (termino, res) => {
    try{

        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const category = await Category.findById(termino)
            return res.status(200).json({
                msg: "Categoría",
                results: (category) ? [category] : []
            })
        }

        const regex = new RegExp(termino, 'i');
        const [total, categorias] = await Promise.all([
            Category.count({
                $and: [{nombre: regex}, {estado: true}]
            }),
            Category.find({
                $and: [{nombre: regex}, {estado: true}]
            })
               
        ])

        res.status(201).json({
            msg: (total === 0) ? "No hay categorías con ese nombre" : (total > 1) ? "Categorías" : "Categoría" ,
            total,
            categorias
        })


    } catch(err){
        console.log(err)
        return res.status(500).json({
            msg: "No se pudo completar la búsqueda, consulte con el administrador"
        })
    }

}

const buscarProductos = async (termino, res) =>{
    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId){
        const product = await Product.findById(termino)
        return res.status(200).json({
            msg: "Producto",
            results: (product ? [product] : [])
        })
    }

    const regex = new RegExp(termino, 'i')

    const [total, products] = await Promise.all([
        Product.count({
            $and: [{nombre: regex}, {estado: true}]
        }),
        Product.find({
            $and: [{nombre: regex}, {estado: true}]
        })
    ])

    res.status(201).json({
        msg: (total === 0) ? "No hay productos con ese nombre" : (total > 1) ? "Productos" : "Producto" ,
        total,
        products
    })
}


const buscar = (req, res) => {

    const {coleccion, termino} =  req. params
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch(coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
        break;

        case 'productos':
            buscarProductos(termino, res)
        break;

        case 'categorias':
            buscarCategorias(termino, res)
        break;

        default:
            res.status(500).json({
                msg: "Esta búsqueda no está soportada, consulte al admin"
            })
    }
    
}

module.exports = {
    buscar
}