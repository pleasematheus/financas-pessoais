const db = require('../db/connection')
const Transacoes = require('../models/Transacoes')

module.exports = class TransactionController {
  static async index(request, response) {
    const registroTransacoes = await Transacoes.findAll({
      where: { usuarioId: request.session.userId },
      raw: true
    })

    response.render('transacoes', { registroTransacoes })
  }

  static async cadastro(request, response) {
    const { nome, descricao, valor } = request.body

    if (!nome || !valor) {
      request.flash('erro', 'Dados incompletos!')
      TransactionController.index(request, response)
      return
    }

    const dadosTransacao = {
      nome: nome,
      descricao: descricao,
      valor: valor,
      usuarioId: request.session.userId
    }

    await Transacoes.create(dadosTransacao)

    request.flash('sucesso', 'Transação cadastrada!')

    response.redirect('/')
  }

  static async getEditar(request, response) {
    const id = parseInt(request.params.id);

    console.log(request.params)

    if (isNaN(id)) {
      console.error('ID inválido:', request.params.id);
      return response.status(400).send('ID inválido.');
    }

    try {
      const item = await Transacoes.findByPk(id, { raw: true });

      if (!item) {
        return response.status(404).send('Transação não encontrada.');
      }

      response.render('editar', { item });
    } catch (error) {
      console.error('Erro ao buscar transação:', error);
      response.status(500).send('Erro no servidor.');
    }
  }

  static async postEditar(request, response) {
    const { id } = request.params

    const dadosNovos = {
      nome: request.body.nome,
      descricao: request.body.descricao,
      valor: request.body.valor
    }

    Transacoes.update(dadosNovos, {where: {id: id}})

    request.flash('sucesso', 'Transação editada!')

    response.redirect('/transacoes')
  }

  static async excluir(request, response) {
    const { id } = request.params

    await Transacoes.destroy({
      where: { id: id, usuarioId: request.session.userId }
    })

    request.flash('sucesso', 'Transação excluida!')

    response.redirect('/')
  }
}