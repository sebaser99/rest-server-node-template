const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validarJWT = async(req, res, next)=> {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la petición"
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await User.findById(uid)
        if(!usuario){
            return res.status(401).json({
                msg: "Token no válido - Usuario no existe en DB"
            })
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no válido - estado: false"
            })
        }
        req.usuario = usuario
        next()
    } catch(err){
        console.log(err)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
   
    
}

module.exports = {
    validarJWT
}