const esAdminRol = (req, res, next) => {
    const {nombre, rol} = req.usuario;
    if(!rol){
        return res.status(500).json({
            msg: `Está intentado verficar rol sin autenticar el token`
        })
    }

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no  tiene permisos de Administrador para borrar este usuario`
        })
    }
    next()
}

const tieneRol = (...roles) => {
    
    return (req, res, next)=> {
        const {rol, nombre} = req.usuario
        if(!rol){
            return res.status(500).json({
                msg: `Está intentado verficar rol sin autenticar el token`
            })
        }
        if(!roles.includes(rol)){
            return res.status(500).json({
                msg: `El usuario ${nombre} debe tener alguno de estos roles para borrar ${roles}`
            })
        }
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}