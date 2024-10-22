const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, tieneRole} = require('../middlewares')
const { validarJWT } = require('../middlewares');
const { resultadoEmergenciasGet, resultadoEmergenciaGet, resultadoEmergenciaPost, resultadoEmergenciaPut, resultadoEmergenciaDelete } = require('../controllers/resultadoEmergencia.controller');

const router = Router();

router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos

], resultadoEmergenciasGet)

router.get('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], resultadoEmergenciaGet)

router.post('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], resultadoEmergenciaPost)

router.put('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], resultadoEmergenciaPut)

router.delete('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], resultadoEmergenciaDelete)

module.exports = router;