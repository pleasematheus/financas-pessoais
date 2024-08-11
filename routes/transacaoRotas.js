const express = require('express')
const router = express.Router()

const TransactionController = require('../controllers/TransacoesControladora')

router.get('/', TransactionController.index)

router.post('/', TransactionController.cadastro)

router.get('/editar/:id', TransactionController.getEditar)

router.post('/editar/:id', TransactionController.postEditar)

router.post('/excluir/:id', TransactionController.excluir)

module.exports = router