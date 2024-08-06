const connection = require('../db/connection')
const { DataTypes } = require('sequelize')

const Contas = connection.define('Contas', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
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

Contas.associate = function (models) {
  Contas.belongsTo(models.Usuarios, {
    foreignKey: 'usuarioId',
    as: 'usuario'
  })
  Contas.hasMany(models.Receitas, {
    foreignKey: 'contaId',
    as: 'receitas'
  })
}

module.exports = Contas