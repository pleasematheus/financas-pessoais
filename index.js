require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')

const server = express()

const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const conn = require('./db/connection')
const authRotas = require('./routes/authRotas')
const contaRotas = require('./routes/contaRotas')
const receitaRotas = require('./routes/receitaRotas')
const usuarioRotas = require('./routes/usuarioRotas')

const Contas = require('./models/Contas')
const Receitas = require('./models/Receitas')
const Usuarios = require('./models/Usuarios')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static('public'))

server.engine('handlebars', handlebars.engine())
server.set('view engine', 'handlebars')

server.use(
  session({
    name: 'session',
    secret: 'amoeba',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => { },
      path: require("path").join(__dirname, "sessions")
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      httpOnly: true
    }
  })
)

server.use(flash())

server.use((request, response, next) => {
  if (request.session.userId)
    response.locals.session = request.session
  next()
})

server.use('/', authRotas)

server.get('/', (request, response) => {
  response.render('transacoes')
})

server.use('/usuario', usuarioRotas)

// server.get('/cadastro', (request, response) => {
//   response.render('cadastro', { layout: false })
// })

// server.get('/login', (request, response) => {
//   response.render('login', { layout: false })
// })

conn
  .sync()
  .then(() => {
    server.listen(process.env.SERVER_PORT)
    console.log(`Servidor iniciado: http://localhost:${process.env.SERVER_PORT}`)
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err)
  })