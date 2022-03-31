const {Router} = require('express');
const {check} = require('express-validator');
const { getImage } = require('../controllers');
const { validarColecciones } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.get('/:coleccion/:id', [
    check('id', "No es un id válido de mongo").isMongoId(),
    check('coleccion').custom(c => validarColecciones( c, ['usuarios', 'productos'])),
    validarCampos
    ],
    getImage
    )

module.exports =  router;