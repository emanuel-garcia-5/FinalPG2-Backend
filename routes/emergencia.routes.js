const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, tieneRole} = require('../middlewares')
const { validarJWT } = require('../middlewares');
const { getEmergencias, getEmergencia, postEmergencias, putEmergencias, deleteEmergencia, putEmergenciasEstado, infoPublica } = require('../controllers/emergencia.controller');

const router = Router();

router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos

],getEmergencias)

router.get('/get/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
],getEmergencia)

router.post('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
],postEmergencias)

router.put('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], putEmergencias)

router.put('/estado/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], putEmergenciasEstado)

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], deleteEmergencia)

router.get('/infopublica',infoPublica)

module.exports = router;