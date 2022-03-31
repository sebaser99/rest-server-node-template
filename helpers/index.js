
const cargarArchivos = require('./cargar-archivos');
const googleVerify   = require('./google-verify');
const dbValidator    = require('./db-validator');
const generarJWT     = require('./generar-JWT');

module.exports = {
    ...cargarArchivos,
    ...googleVerify,
    ...dbValidator,
    ...generarJWT
}
