const express = require('express')
const handlebars = require('express-handlebars')
const { SERVER_PORT } = require('./.env')

// const contas = require('./scripts/contas')
// const transacoes = require('./scripts/transacoes')

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
  response.render('financas', {})
})

//Cadastro
app.get('/conta/cadastro', (request, response) => {
  response.render('financas', {})
})

//Conta única
app.get('/conta/:id', (request, response) => {

})

app.listen(3000, () => {
  console.log(`Servidor iniciado: http://localhost:${SERVER_PORT}`)
})