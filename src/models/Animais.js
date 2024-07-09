const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Animal = connection.define('animal', {
    nome_do_animal: {
        type: DataTypes.STRING,
        allowNull: false // Adicionando allowNull para garantir que o nome_do_animal não seja nulo
    },
    descricao: {
        type: DataTypes.STRING
    },
    habitat: {                                  
        type: DataTypes.STRING
    },
    localizacao: { // Corrigido para localizacao (sem acento)
        type: DataTypes.STRING
    }
});

module.exports = Animal