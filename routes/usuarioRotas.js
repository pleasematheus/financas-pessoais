const express = require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuariosControladora')

router.get('/', UsuarioController.index)

router.get('/novo', UsuarioController.getFormCadastro)

router.post('/novo', UsuarioController.cadastrar)

module.exports = router