const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Planta = connection.define('planta', {
    nome_da_planta: {
        type: DataTypes.STRING,
        allowNull: false // Adicionando allowNull para garantir que o nome_da_planta não seja nulo
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

module.exports = Planta