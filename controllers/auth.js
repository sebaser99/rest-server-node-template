const bcrypt = require("bcryptjs")
const { json } = require("express/lib/response")
const { generarJWT } = require("../helpers/generarJWT")
const { googleVerify } = require("../helpers/google-verify")
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

const google = async (req, res) => {
    try{ 
    const {id_token} = req.body
    const {nombre, email, img} = await googleVerify(id_token)

   let usuario = await User.findOne({email})

    if(!usuario){
        let data = {
            nombre, email, img, google: true, password: ':D'
        }

         usuario = new User(data)
         await usuario.save();

        res.status(201).json({
            msg: 'Usuario creado',
            usuario

        })
    }

    if(!usuario.estado){
        return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado'
        })
    }

    const jwt = generarJWT(usuario.id)

    res.status(201).json({
        msg: "Ok id_token google recibido",
        usuario,
        jwt
    })

    } catch(err){
        res.status(400).json({
            msg: "Token de google no es válido"
        })

        console.log(err)
    }
}

module.exports = {
    login,
    google
}