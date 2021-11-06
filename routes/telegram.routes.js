const { Router } = require('express');
const { check } = require('express-validator');
const { datosTelegram } = require('../controllers/telegram.controller');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/',[
    check('correo','el correo es obligatorio').notEmpty(),
    check('correo','no es un email valido').isEmail(),
    validarCampos
], datosTelegram)


module.exports = router;