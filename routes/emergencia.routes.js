const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, tieneRole} = require('../middlewares')
const { validarJWT } = require('../middlewares');
const { getEmergencias, getEmergencia, postEmergencias, putEmergencias, deleteEmergencia } = require('../controllers/emergencia.controller');

const router = Router();

router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos

],getEmergencias)

router.get('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
],getEmergencia)

router.post('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
],postEmergencias)

router.put('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], putEmergencias)

router.delete('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], deleteEmergencia)

module.exports = router;