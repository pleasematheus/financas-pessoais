const bcrypt = require('bcryptjs')

const Usuario = require('../models/Usuarios')

module.exports = class AuthController {
  static index(request, response) {
    response.render('transacoes')
  }

  static login(request, response) {
    response.render('login', {layout: false})
  }

  static async loginPost(request, response) {
    const { email, passw } = request.body

    const usuario = await Usuario.findOne({ where: { email: email } })
    const senha = bcrypt.compareSync(passw, usuario.passw)

    if (!usuario || !senha) {
      request.flash('erro', 'Usuário ou senha inválido')
      AuthController.login(request, response)
      return
    }

    request.session.userId = usuario.id

    request.session.save(() => {
      response.redirect('/')
    })
  }

  static signup(request, response) {
    response.render('cadastro', {layout: false})
  }

  //TODO: Finalizar
  static async signupPost(request, response) {
    const { nome, email, passw, confirmPassw } = request.body

    if (passw != confirmPassw) {
      request.flash('erro', 'Senhas não conferem')

      AuthController.signup(request, response)

      return
    }

    const usuario = await Usuario.findOne({ where: { email: 'email' } })

    if (usuario) {
      request.flash('erro', 'Email já cadastrado')

      AuthController.signup(request, response)

      return
    }

    const passwHash = bcrypt.hashSync(passw, bcrypt.genSaltSync(10))

    const dados = {
      nome,
      email,
      passw: passwHash
    }

    const user = await Usuario.create(dados)

    request.flash('sucesso', 'Cadastro realizado com sucesso')

    request.session.userId = user.id

    request.session.save(() => {
      response.redirect('/')
    })
  }

  static logout(request, response) {
    request.session.destroy()

    response.redirect('/')
  }

  static makeAuthMiddleware(request, response, next) {
    const { ensureAuthenticated } = require('./middlewares/authMiddleware')
    ensureAuthenticated()
    next()
  }
}