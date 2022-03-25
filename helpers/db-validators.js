const Role = require('../models/rol');

const isValidRol = async rol => {
    const existRol = await Role.findOne({rol})
    if(!existRol){
        throw new Error(`El rol ${rol} no está definido en las opciones de la DB`)
    }
}

module.exports = {
    isValidRol
}