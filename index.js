const express = require('express')
const handlebars = require('express-handlebars')
const { SERVER_PORT } = require('./.env')

let registroTransacoes = []

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.static('public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//Home
app.get('/', (request, response) => {
  response.render('transacoes', { registroTransacoes })
})

//Conta criada
app.post('/', (request, response) => {
  const { nome, valor, movimentacao, opcao} = request.body;

  const id = registroTransacoes.length + 1
  const novoValor = parseFloat(valor) || 0

  const transacao = {
    id,
    nome,
    valor: novoValor.toFixed(2),
    movimentacao,
    opcao
  }

  registroTransacoes.push(transacao)

  response.redirect('/');
})

app.get('/conta', (request, response) => {
  response.redirect('/')
})

//TODO: Fazer rota de exclusão, atualização e tratamento de erro 500
app.post('/conta/excluir/:id', (request, response) => {
  const idToBeRemoved = parseInt(request.params.id)
  const idIndex = registroTransacoes.findIndex(key => key.id === idToBeRemoved.toString())

  registroTransacoes.splice(idIndex, 1)

  response.status(204)
  response.redirect('/')
})

app.get('/conta/editar/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const idIndex = registroTransacoes.findIndex(key => key.id === id)
  const item = registroTransacoes[idIndex]

  response.render('editar', { item })
})

app.post('/conta/editar/:id', (request, response) => {
  const {
    nome: novoNome,
    valor: novoValor,
    opcao: novaOpcao,
    movimentacao: novaMovimentacao
  } = request.body

  const id = parseInt(request.params.id)
  const idIndex = registroTransacoes.findIndex(key => key.id === id)

  // const {
  //   nome: nomeRegistro,
  //   valor: valorRegistro,
  //   opcao: opcaoRegistro,
  //   movimentacao: movimentacaoRegistro
  // } = registroTransacoes[idIndex]

  registroTransacoes[idIndex].nome = novoNome
  registroTransacoes[idIndex].valor = novoValor
  registroTransacoes[idIndex].opcao = novaOpcao
  registroTransacoes[idIndex].movimentacao = novaMovimentacao

  response.redirect('/')
})

//404
app.all('*', (request, response) => {
  response.status(404).render('erro')
})

app.listen(3000, () => {
  console.log(`Servidor iniciado: http://localhost:${SERVER_PORT}`)
})