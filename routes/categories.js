const {Router} = require('express');
const {check} = require('express-validator');
const { newCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { validarJWT, esAdminRol } = require('../middlewares');
const { validarCampos, categoryExistById} = require('../middlewares/validar-campos');

const router = Router()

router.get('/',[
    validarJWT,
    validarCampos
    ],
     getCategories)

router.get('/:id', [
    validarJWT,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(categoryExistById),
    validarCampos
    ],
    getCategory)

router.post('/', [  
    validarJWT,
    check('nombre', "El nombre de la categoría es obligatorio").not().isEmpty(),
    validarCampos
    ],
    newCategory
)

router.put('/:id', [
    validarJWT,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(categoryExistById),
    check('nombre', "El nombre de la categoría es obligatorio").not().isEmpty(),
    validarCampos
    ], 
    updateCategory)

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(categoryExistById),
    validarCampos
    ], deleteCategory)

module.exports = router;