const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Usuario = connection.define('usuarios', {
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Usuario

