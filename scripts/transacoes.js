module.exports = class Transacao {
  #id
  #nome
  #valor

  constructor(id, nome, valor) {
    this.#id = id
    this.#nome = nome
    this.#valor = valor
  }

  get getId() {
    return this.#id
  }

  get getNome() {
    return this.#nome
  }

  get getValor() {
    return this.#valor
  }

  set setNome(novoNome) {
    this.#nome = novoNome
  }

  set setValor(novoValor) {
    this.#valor = novoValor
  }
}