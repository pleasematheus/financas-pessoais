require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')

const server = express()

const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const conn = require('./db/connection')
const authRotas = require('./routes/authRotas')
const usuarioRotas = require('./routes/usuarioRotas')
const transacaoRotas = require('./routes/usuarioRotas')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static('public'))

server.engine('handlebars', handlebars.engine())
server.set('view engine', 'handlebars')

server.use(
  session({
    name: 'session',
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => { },
      path: require("path").join(__dirname, "sessions")
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      httpOnly: true
    }
  })
)

server.use(flash())

server.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session
    return next()
  }
  if (req.path !== '/login' && req.path !== '/cadastro') {
    return res.redirect('/login')
  }
  next()
})

server.use('/', authRotas)
server.use('/usuario', usuarioRotas)

server.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/transacoes')
  }
  res.redirect('/login')
})

server.get('/transacoes', (req, res) => {
  res.render('transacoes')
})

conn
  .sync()
  .then(() => {
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Servidor iniciado: http://localhost:${process.env.SERVER_PORT}`)
    })
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err)
  })