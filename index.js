const express = require('express')
const handlebars = require('express-handlebars')
const { SERVER_PORT } = require('./.env')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.get('/', (request, response) => {
  response.send('<h1>Tela inicial</h1>')
})

app.listen(3000, () => {
  console.log(`Servidor iniciado: http://localhost:${SERVER_PORT}`)
})