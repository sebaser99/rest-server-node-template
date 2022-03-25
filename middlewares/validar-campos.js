const { validationResult } = require("express-validator");
const User = require('../models/user');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    next()
}

const emailExiste = async (email = '') => {
    
    const existEmail = await User.findOne({email})
    if(existEmail){
        throw new Error(`El correo ${email} ya está registrado`)
        
    }
}

const usuarioExiste = async (id) => {
    
    const existUser = await User.findById(id)
    if(!existUser){
        throw new Error(`El id ${id} no es válido`)
        
    }
}
module.exports = {
    validarCampos,
    emailExiste,
    usuarioExiste
}