const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validarJWT);

//obtener eventos
router.get('/', getEventos);

//crear evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha fin es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

//actualizar evento
router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha fin es obligatoria').custom(isDate),
    validarCampos
],actualizarEvento);

//borrar eventos
router.delete('/:id', eliminarEvento);


module.exports = router;