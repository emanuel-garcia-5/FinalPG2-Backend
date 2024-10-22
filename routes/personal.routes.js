const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, tieneRole} = require('../middlewares')
const { validarJWT } = require('../middlewares');
const { personalesGet, personalGet, personalPost, personalPut, personalDelete } = require('../controllers/personal.controller');

const router = Router();

router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos

], personalesGet)

router.get('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], personalGet )

router.post('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], personalPost)

router.put('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], personalPut)

router.delete('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], personalDelete )

module.exports = router;