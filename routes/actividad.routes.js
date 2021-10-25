const { Router } = require('express');
const { check } = require('express-validator');
const { creaActividad, insertaRespuesta } = require('../controllers/actividad.controller');


const { existeCursoPorId, existeUsuarioPorId, existeActividadPorId } = require('../helpers/db-validators');
const { validarJWT, tieneRole, validarArchivoSubir } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('idcurso','el id del curso es obligatorio').notEmpty(),
    check('idcurso','No es un id de mongo').isMongoId(),
    validarJWT,
    tieneRole('CATEDRATICO_ROLE'),
    validarCampos
], creaActividad);

// router.put('/',[
//     check('idactividad','el id curso debe venir').isMongoId(),
//     check('idactividad','el id curso debe venir').custom(existeActividadPorId),
//     check('resp','se debe inculir resp').notEmpty(),
//     validarJWT,
//     tieneRole('ESTUDIANTE_ROLE'),
//     validarArchivoSubir,
//     validarCampos
// ],insertaRespuesta)

// router.get('/',[
//     validarJWT,
//     tieneRole('CATEDRATICO_ROLE'),
//     validarCampos
// ],);

// router.get('/:id',[
//     validarJWT,
//     tieneRole('CATEDRATICO_ROLE'),
//     validarCampos
// ],);



module.exports = router;