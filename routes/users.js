const {Router} = require('express');
const { getUser, postUser, deleteUser, putUser, patchUser } = require('../controllers/users');

const router = Router();

router.get('/', getUser)
router.post('/', postUser )
router.delete('/', deleteUser )
router.put('/', putUser)
router.patch('/', patchUser)


module.exports = router