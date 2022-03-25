const brcyptjs = require('bcryptjs');
const User = require('../models/user');

const getUser = async (req, res) => {
    const {limite = 5, desde= 0} = req.query
    const query = {estado: true}
  
    // const users = await User.find(query)
    //     .skip(Number(desde) ? Number(desde) : 0)
    //     .limit(Number(limite) ? Number(limite) : 5)
    // const registros = await User.count(query)

    const [total, usuarios]= await Promise.all([
        User.count(query),
        User.find(query)
            .skip(Number(desde) ? Number(desde) : 0)
            .limit(Number(limite) ? Number(limite) : 5)
        
    ])
    res.status(200).json({
        msg: 'get Usuarios',
        total, 
        usuarios
        // registros,
        // users
    })
}

const postUser = async(req, res) => {
    
    //desestructuro las variables del body
    const {nombre, password, email, rol} = req.body
    
    //creo el usuario valiéndome del modelo
    const user = new User({nombre, email, password, rol});  
    //Encriptar contraseña
    const salt = brcyptjs.genSaltSync();
    user.password = brcyptjs.hashSync(password, salt)

    //guardo en vase de datos
    await user.save()
    //envío respuesta a la API
    res.status(200).json({
        msg: 'usuario creado',
        user
    })
}

const putUser = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    //Validar con base de datos
     if(password){
         //Encriptar la contraseña
         const salt = brcyptjs.genSaltSync();
         resto.password = brcyptjs.hashSync(password, salt);
     }
     const usuario = await User.findByIdAndUpdate(id, resto);
     console.log(usuario)

    res.status(200).json({
        msg: 'Usuario modificado exitosamente',
        usuario
    })
}

const deleteUser = async(req, res) => {
    const {id} = req.params
    const usuario = await User.findByIdAndUpdate(id, {estado: false})
    res.status(200).json({
        msg: `Usuario ${id} borrado exitosamente`,
        usuario
    })
}

const patchUser = (req, res) => {
    res.status(200).json({
        msg: 'patch API'
    })
}

module.exports = {
    getUser,
    putUser,
    deleteUser,
    postUser,
    patchUser
}