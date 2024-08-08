const db = require('../db/connection')
const Usuario = require('../models/Usuarios')

module.exports = class UserModel {
  static async index(request, response) {
    const usuarios = await Usuario.findAll({raw: true})
    response.render('transacoes')
  }

  static getFormCadastro(request, response) {
    response.render('cadastro', { layout: false })
  }
    
  static async cadastrar(request, response) {
    const { nome, email, passw } = request.body

    const dados = {
      nome: nome,
      email: email,
      passw: passw
    }

    const usuario = await Usuario.create(dados)

    request.flash('sucesso','Usuário cadastrado com sucesso!')
  }
}