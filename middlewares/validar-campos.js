const { validationResult } = require("express-validator");
const { Category, Product } = require("../models");
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

const categoryExistById = async(id) => {
    const existCategory = await Category.findById(id)
    if(!existCategory){
        throw new Error(`eL id de la categoría no es válido. Id: ${id}`)
    }
}

const categoryExistByName = async(categoria = '') => {
    if(categoria !== ''){ 
        const validName = categoria.toLocaleUpperCase()
        const existCategory = await Category.findOne({nombre: validName})
        if(!existCategory){
            throw new Error(`La categoría ${categoria} no existe en DB, por favor creela antes de agregar productos. `)
        }
    }
}

const productExistById = async(id) => {

    const existProduct = await Product.findById(id)
    if(!existProduct){
        throw new Error(`No existe un producto con id ${id}, consulte al admin `)
    }
}

module.exports = {
    validarCampos,
    emailExiste,
    usuarioExiste,
    categoryExistById,
    categoryExistByName,
    productExistById
}