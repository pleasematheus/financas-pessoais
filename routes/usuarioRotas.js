const express = require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuariosControladora')
const AuthController = require('../controllers/AuthControladora')

router.use(AuthController.makeAuthMiddleware)

router.get('/', UsuarioController.index)

router.get('/novo', UsuarioController.getFormCadastro)

router.post('/novo', UsuarioController.cadastrar)

module.exports = router