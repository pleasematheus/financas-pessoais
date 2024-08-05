const connection = require('../db/connection')
const { DataTypes } = require('sequelize')

const Receitas = connection.define('Receitas', {
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAsset: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isFixedValue: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  contaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Contas',
      key: 'id'
    }
  }
})

Receitas.associate = function (models) {
  Receitas.belongsTo(models.Contas, {
    foreignKey: 'contaId',
    as: 'conta'
  })
}

module.exports = Receitas