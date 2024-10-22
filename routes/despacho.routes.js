const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos, tieneRole} = require('../middlewares')
const { validarJWT } = require('../middlewares');
const { despachoGet, despachosGet, despachosPost, despachosPut, despachosDelete } = require('../controllers/despachos.controller');

const router = Router();

router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos

], despachosGet)

router.get('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], despachoGet)

router.post('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], despachosPost)

router.put('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], despachosPut)

router.delete('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','OPERADOR_ROLE'),
    validarCampos
], despachosDelete)

module.exports = router;