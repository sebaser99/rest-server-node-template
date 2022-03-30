const { Category, Product } = require("../models")


const getProductos = async (req, res) => {
    const {limite = 5, desde = 0 } = req.params
    const query = {estado: true}
    try{
        const [total, productos] = await  Promise.all([
            Product.count(query),
            Product.find(query)
            .populate('usuario', ['nombre', 'email', 'rol', '_id'] )
            .populate('categoria', 'nombre' )
            .skip(Number(desde) ? Number(desde) : 0)
            .limit(Number(limite) ? Number(limite) : 5)
        ])
       
        res.status(200).json({
            msg: "Productos",
            total,
            productos
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            msg: "no se pudo crear el producto, consulte al administrador"
        })
    }
}

const getProducto = async(req, res) => {
    try { 
        const {id} = req.params
        const producto = await Product.findById(id)
                    .populate('usuario', ['nombre', 'email', 'rol', '_id'] )
                    .populate('categoria', 'nombre' )
        if(!producto.estado) return res.status(401).json({msg: 'Producto - borrado'}) 
        res.status(200).json({
            msg: "producto",
            producto
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "no se pudo obtener el producto, consulte al admin"
        })
    }
}

const crearProducto = async (req, res) => {
    try{ 
        const {estado, usuario, nombre} = req.body
        const validCategoria = categoria.toLocaleUpperCase()
        const {_id} = await Category.findOne({validCategoria})
        const productoDB = await Product.findOne({nombre})
        if(productoDB){
            return res.json(401).status({
                msg: "Este producto ya existe, consulte al admin"
            })
        }
        const data = {
            nombre,
            usuario: req.usuario._id,
            categoria: _id.toString()
            
        }
    const producto = new Product(data)
    await producto.save()

    res.status(201).json({
        msg: "Producto creado",
        producto
    })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "no se pudo crear el producto, consulte al administrador"
        })
    }

}

const actualizarProducto = async (req, res) => {
    try{ 
    const { id} = req.params
    const {estado, usuario, ...data} = req.body
    data.usuario = req.usuario._id
   if(data.categoria){
       const {_id} = await Category.findOne({nombre: data.categoria.toLocaleUpperCase()})
       data.categoria = _id.toString()
   }

    const productoActualizado = await Product.findByIdAndUpdate(id, data, {new: true})
    res.status(200).json({
        msg: 'Producto modificado',
        productoActualizado
    })

    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "no se pudo modificar el producto, consulte al administrador"
        })
    }

}

const eliminarProducto = async(req, res ) => {
    try { 
        const {id} = req.params
        const productoEliminado = await Product.findByIdAndUpdate(id, {estado: false}, {new: true})
        res.status(201).json({
            msg: "Producto eliminado exitosamente",
            productoEliminado
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "no se pudo eliminar el producto, consulte al administrador"
        })
    }
}

module.exports = {
    crearProducto,
    getProductos,
    getProducto,
    actualizarProducto,
    eliminarProducto
}