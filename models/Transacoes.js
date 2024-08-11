const connection = require('../db/connection')
const { DataTypes } = require('sequelize')

const Transacoes = connection.define('Transacoes', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id'
    }
  }
})

Transacoes.associate = function (models) {
  Transacoes.belongsTo(models.Usuarios, {
    foreignKey: 'usuarioId',
    as: 'usuario'
  })
}

module.exports = Transacoes