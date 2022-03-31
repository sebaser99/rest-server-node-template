const path = require('path');
const fs =  require('fs');
const { subirArchivo } = require("../helpers");
const { Product, User } = require("../models");
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async(req, res) => { 
  try{
    const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos')

    res.json({
        nombre
    })

  } catch(msg){
      return res.status(400).json({
          msg
      })
  }  
}


const actualizarImagen= async(req, res)=> {
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
                msg: "Esta coleccion no está disponible para actualizar imágen"
            })

    }

    try{
        if(modelo.image){
            const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.image)
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage)
            }
        }
        const nombre = await subirArchivo(req.files, undefined, coleccion)
         modelo.image = nombre 
         await modelo.save()
    
        return res.json({
            modelo
        })
    
      } catch(error){
          console.log(error)
          return res.status(500).json({
              msg: "No se pudo completar la actualización de la imágen, consulte con el admin"
          })
      }  
}

const actualizarImagenCloudinary= async(req, res)=> {
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
                msg: "Esta coleccion no está disponible para actualizar imágen"
            })

    }

    try{
        
        if(modelo.image){
           const nombreArr = modelo.image.split('/')
           const nombre = nombreArr[nombreArr.length - 1]
           const [uid] = nombre.split('.')
           await cloudinary.uploader.destroy(uid)
            
        }
        const {tempFilePath} = req.files.archivo
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        modelo.image = secure_url
        modelo.save()
        return res.json(modelo)
    
      } catch(error){
          console.log(error)
          return res.status(500).json({
              msg: "No se pudo completar la actualización de la imágen, consulte con el admin"
          })
      }  
}
module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary
}
