export default class Contas {
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
}