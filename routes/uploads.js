const {Router} = require('express');
const {check} = require('express-validator');
const { cargarArchivo,actualizarImagen, actualizarImagenCloudinary } = require('../controllers/');
const { validarColecciones } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', "No es un id válido de mongo").isMongoId(),
    check('coleccion').custom(c => validarColecciones( c, ['usuarios', 'productos'])),
    validarCampos
    ],
    actualizarImagenCloudinary
    )

module.exports =  router;
