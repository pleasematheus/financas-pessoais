module.exports = class Contas {
  #nome
  #categoria
  #descricao

  constructor(nome, categoria, descricao) {
    this.#nome = nome
    this.#categoria = categoria
    this.#descricao = descricao
  }

  get getNome() {
    return this.#nome
  }

  get getCategoria() {
    return this.#categoria
  }

  get getDescricao() {
    return this.#descricao
  }

  set setNome(novoNome) {
    this.#nome = novoNome
  }

  set setCategoria(novaCategoria) {
    this.#categoria = novaCategoria
  }

  set setDescricao(novaDescricao) {
    this.#descricao = novaDescricao
  }
}