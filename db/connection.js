const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DB,
    process.env.DB_USER,
    process.env.DB_PASSW,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
)

module.exports = sequelize