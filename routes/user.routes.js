const { Router } = require('express')
const { check } = require('express-validator')
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios') 
const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

const router = Router()

router.get('/', usuariosGet)

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({
      min: 6,
    }),
    check('correo').custom(emailExiste), 
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
)

router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validarCampos,
], usuariosPut)

router.delete('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos,
] ,usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router
