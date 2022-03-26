const bcrypt = require("bcryptjs")
const { generarJWT } = require("../helpers/generarJWT")
const User = require("../models/user")

const login = async(req, res)=> {
    const {email, password} = req.body

        //verificamos que el password exista
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg:"Email o contraseña no son correctos - email"
            })
        }

        //verificamos que el usuario esté activo
        if(!user.estado){
            return res.status(400).json({
                msg:"Email o contraseña no son correctos - estado"
            })
        }

        //verificamos que las contraseñas coincidan
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch){
            return res.status(400).json({
                msg:"Email o contraseña no son correctos - contraseña"
            })
        }

        //generar jwt
        const jwt = await generarJWT(user._id)

    res.json({
        msg: "logged",
        user,
        jwt
    })
}

module.exports = {
    login
}