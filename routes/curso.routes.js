const { Router } = require('express');
const { check } = require('express-validator');

const { creaCurso, insertaUsuario, verCursosInfo, verCursoInfo, borrarCurso } = require('../controllers/curso.controller');
const { existeCursoPorId, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT, tieneRole } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarJWT,
    tieneRole('CATEDRATICO_ROLE'),
    validarCampos
],creaCurso );

router.put('/:idcurso',[
    check('idcurso','el id curso debe venir').isMongoId(),
    check('idcurso','el id curso debe venir').custom(existeCursoPorId),
    check('correo','el id curso debe venir').isEmail(),
    validarJWT,
    tieneRole('CATEDRATICO_ROLE'),
    validarCampos
],insertaUsuario)

router.get('/',[
    validarJWT,
    tieneRole('CATEDRATICO_ROLE','ESTUDIANTE_ROLE'),
    validarCampos
],verCursosInfo);

router.get('/:id',[
    validarJWT,
    tieneRole('CATEDRATICO_ROLE'),
    validarCampos
],verCursoInfo);

router.delete('/:id',[
    check('id','el id no es un id de mongo').isMongoId(),
    validarJWT,
    tieneRole('CATEDRATICO_ROLE'),
    validarCampos
],borrarCurso);



module.exports = router;