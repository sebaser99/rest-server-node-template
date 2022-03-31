const { Category } = require("../models/");

const getCategories = async(req, res)=> {
    try{
        const {limite = 5, desde= 0} = req.query
        const query = {estado: true}

        const [total, categories] =  await Promise.all([
            Category.count(query),
            Category.find(query)
            .populate({path:'usuario', select: ['nombre', 'email', 'rol', '_id'] })
            .skip(Number(desde) ? Number(desde) : 0)
            .limit(Number(limite) ? Number(limite) : 5) 
        ])
       
        res.status(200).json({
            msg: 'All categories',
            total,
            categories
            
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "No se pudo obtener las categorías, consulte con el admin "
        })
    }
   
}
const getCategory = async(req, res)=> {
    try{
        const {id} = req.params
        const category = await Category.findOne({_id: id})
                    .populate({path:'usuario', select: ['nombre', 'email', 'rol', '_id'] })
        if(!category.estado) return res.status(401).json({msg: 'Categoría - borrada'})    

        res.status(200).json({
            msg: 'Category found',
            category,
            id
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "No se pudo obtener la categoría, consulte con el admin "
        })
    }

   
}
const newCategory = async (req, res)=> {
    try{
        const nombre = req.body.nombre.toUpperCase();
        const categoryDB = await Category.findOne({nombre})
    
        if(categoryDB){
            return res.status(400).json({
                msg: `La categoria ${categoryDB} ya existe`
            })
        }
        const data = {
            nombre,
            usuario: req.usuario._id
        }
     
        const category = new Category(data)
        await category.save()
    
        res.status(201).json({
            msg: 'Categoría creada',
            category
            
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "No se pudo crear la categoría, consulte con el admin "
        })
    }
}

const updateCategory = async(req, res) => {
    try{ 
        const {id} = req.params
        const {estado, usuario, ...data} = req.body
        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.usuario._id

        const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true} )
        res.status(200).json({
            msg: `Categoría actualizada`,
            updatedCategory
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "No se pudo actualizar la categoría, consulte con el admin "
        })
    }
}   



const deleteCategory = async(req, res) => {
    try{ 
        const {id} = req.params
        const updatedState = await Category.findByIdAndUpdate(id, {estado: false}, {new: true})
        res.status(200).json({
            msg: `La categoría con id ${id} ha sido borrada`,
            updatedState
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: "No se pudo actualizar la categoría, consulte con el admin "
        })
    }
}

module.exports = {
    newCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}