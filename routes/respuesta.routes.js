const { Router } = require('express');
const { check } = require('express-validator');
const { creaRespuesta, obtnerRespuestas, obtnerRespuestasNota } = require('../controllers/respuesta.constroller');


const { existeCursoPorId, existeUsuarioPorId, existeActividadPorId } = require('../helpers/db-validators');
const { validarJWT, tieneRole, validarArchivoSubir } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();



router.post('/',[
    check('idactividad','el id curso debe venir').isMongoId(),
    check('idactividad','el id curso debe venir').custom(existeActividadPorId),
    check('resp','se debe inculir resp').notEmpty(),
    validarJWT,
    tieneRole('ESTUDIANTE_ROLE'),
    validarArchivoSubir,
    validarCampos
],creaRespuesta)

router.get('/:idactividad',[
    check('idactividad','el id curso debe venir').isMongoId(),
    check('idactividad','el id curso debe venir').custom(existeActividadPorId),
    validarJWT,
    tieneRole('CATEDRATICO_ROLE'),
    validarCampos
],obtnerRespuestas);

router.get('/',[
    validarJWT,
    tieneRole('ESTUDIANTE_ROLE'),
    validarCampos
],obtnerRespuestasNota);

// router.get('/:id',[
//     validarJWT,
//     tieneRole('CATEDRATICO_ROLE'),
//     validarCampos
// ],);



module.exports = router;