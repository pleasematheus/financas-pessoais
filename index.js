const express = require('express')
const handlebars = require('express-handlebars')
const { SERVER_PORT } = require('./.env')

const transacoes = require('./scripts/transacoes')

let registroTransacoes = []

const app = express()

const hbs = handlebars.create({
  helpers: {
    json: function (context) {
      return JSON.stringify(context)
    }
  }
})

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
  const transacao = `{
    "id": "${registroTransacoes.length+1}",
    "nome": "${request.body.nome}",
    "valor": "${parseFloat(request.body.valor)
    .toFixed(2)}",
    "movimentacao": "${request.body.movimentacao}",
    "opcao": "${request.body.opcao}"
  }`

  registroTransacoes.push(JSON.parse(transacao))

  console.log(registroTransacoes)

  response.redirect('/');
})

//Conta única
app.get('/conta/:id', (request, response) => {
  response.render('transacoes', { transacoes })
})

app.get('/conta', (request, response) => {
  response.redirect('/')
})

//TODO: Fazer rota de exclusão, atualização e tratamento de erro 500
app.post('/conta/excluir/:id', (request, response) => {
  const idToBeRemoved = parseInt(request.params.id)
  const idIndex = registroTransacoes.findIndex(key => key.id === idToBeRemoved.toString())

  registroTransacoes.splice(idIndex, 1)

  response.redirect('/')
})

//404
app.all('*', (request, response) => {
  response.status(404).render('erro')
})

app.listen(3000, () => {
  console.log(`Servidor iniciado: http://localhost:${SERVER_PORT}`)
})