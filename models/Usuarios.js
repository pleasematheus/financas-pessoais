const connection = require('../db/connection')
const { DataTypes } = require('sequelize')

const Usuarios = connection.define('Usuarios', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passw: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Usuarios.associate = function (models) {
  Usuarios.hasMany(models.Contas, {
    foreignKey: 'usuarioId',
    as: 'contas'
  })
}

module.exports = Usuarios