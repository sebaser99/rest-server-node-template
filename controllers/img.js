const path = require('path');
const { response } = require("express");
const { User, Product } = require("../models");


const getImage = async (req, res = response) => {
    const {id, coleccion} = req.params
    let modelo;
    switch(coleccion) {
        case 'productos':
            modelo = await Product.findById(id)
            if(!id){
                return res.status(400).json({
                    msg: `No existe un producto con id ${id}`
                })
            }
        break;
        case 'usuarios':
            modelo = await User.findById(id)
            if(!id){
                return res.status(400).json({
                    msg: `No existe un usuario con id ${id}`
                })
            }
        break;

        default:
            return res.status(500).json({
                msg: "Esta coleccion no está disponible para mostrar imágen"
            })

    }

    try{
        if(modelo.image){
            const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.image)
            return res.sendFile(pathImage)
        }    
        const pathImage = path.join(__dirname, '../assets',  'no-image.jpg')
        return res.sendFile(pathImage)
    
      } catch(error){
          console.log(error)
          return res.status(500).json({
              msg: "No se pudo completar la actualización de la imágen, consulte con el admin"
          })
      }  
}

module.exports = {
    getImage
}