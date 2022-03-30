const {Router} = require('express');
const {check} = require('express-validator');
const { crearProducto, getProductos, getProducto, actualizarProducto, eliminarProducto } = require('../controllers/products');
const { validarJWT, validarCampos, categoryExistByName, productExistById, esAdminRol} = require('../middlewares');

const router = Router();

router.get('/', [ 
    validarJWT,
    validarCampos
    ],  
    getProductos)

router.get('/:id', [ 
    validarJWT,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(productExistById),
    validarCampos
    ],
    getProducto)


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('categoria', 'La categoría es requerida').not().isEmpty(),
    check('categoria').custom(categoryExistByName),
    validarCampos
    ], 
    crearProducto)

router.put('/:id', [ 
     validarJWT,
     check('id', "No es un id válido").isMongoId(),
    check('id').custom(productExistById),
    check('categoria').custom(categoryExistByName),
    validarCampos
    ],
    actualizarProducto
    )

router.delete('/:id', [
    validarJWT,
     check('id', "No es un id válido").isMongoId(),
     check('id').custom(productExistById),
     esAdminRol
    ],
    eliminarProducto)

module.exports = router;