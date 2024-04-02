const express = require('express')
const handlebars = require('express-handlebars')
const { SERVER_PORT } = require('./.env')

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
app.get('/contas', (request, response) => {
  response.send('<h1>Não finalizado ainda</h1>')
})

app.listen(3000, () => {
  console.log(`Servidor iniciado: http://localhost:${SERVER_PORT}`)
})