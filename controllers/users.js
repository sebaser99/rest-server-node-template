

const getUser = (req, res) => {
    res.status(200).json({
        msg: 'get API'
    })
}

const postUser = (req, res) => {
    const {nombre, edad} = req.body
    res.status(200).json({
        msg: 'post API',
        nombre,
        edad
    })
}
const deleteUser = (req, res) => {
    res.status(200).json({
        msg: 'delete API'
    })
}
const putUser = (req, res) => {
    res.status(200).json({
        msg: 'put API'
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