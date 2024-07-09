'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'plantas',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome_da_planta: {
          allowNull: false,
          type: Sequelize.STRING
        },
        descricao: {
          allowNull: false,
          type: Sequelize.STRING
        },
        habitat: {
          allowNull: false,
          type: Sequelize.STRING // Corrigido para tipo STRING
        },
        localizacao: {
          allowNull: false,
          type: Sequelize.STRING // Corrigido para tipo STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plantas');
  }
};