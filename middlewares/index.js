// const { esAdminRol, tieneRol } = require('../middlewares/validar-adminRol');
// const { validarCampos, emailExiste, usuarioExiste } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');


const validarAdminRol = require('../middlewares/validar-adminRol');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarArchivo = require('../middlewares/validar-archivo')


module.exports = {
    ...validarAdminRol,
    ...validarCampos,
    ...validarJWT,
    ...validarArchivo

}