const {Router} = require('express');
const { check } = require('express-validator');
const { getUser, postUser, deleteUser, putUser, patchUser } = require('../controllers/');
const { isValidRol } = require('../helpers');
const { tieneRol, validarCampos, emailExiste, usuarioExiste, validarJWT } = require('../middlewares');


const router = Router();

router.get('/', getUser)

router.post('/', [
    check('email', 'El email no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de almenos 6 caracteres').isLength({min: 6}),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isValidRol),
    validarCampos
    ], postUser )

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExiste),
        check('rol').custom(isValidRol),
        validarCampos
    ],
     putUser)
router.delete('/:id', [
        validarJWT,
        // esAdminRol,
        tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
        ], 
        deleteUser )

router.patch('/', patchUser)


module.exports = router