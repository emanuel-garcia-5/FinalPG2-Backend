const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, tieneRole} = require('../middlewares')
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators')
const { usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares');

const router = Router();


router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio y mas de 6 caracteras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
     validarJWT,
     tieneRole('ADMIN_ROLE','SUPER_ROLE'),
    validarCampos

], usuariosPost)

router.delete('/:id',[ 
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)




module.exports = router;