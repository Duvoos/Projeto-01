'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'animais',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome_do_animal: {
          allowNull: false,
          type: Sequelize.STRING
        },
        descricao: {
          allowNull: false,
          type: Sequelize.STRING
        },
        habitat: { // Corrigido para tipo STRING
          allowNull: false,
          type: Sequelize.STRING
        },
        localizacao: { // Corrigido para tipo STRING
          allowNull: false,
          type: Sequelize.STRING
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
    await queryInterface.dropTable('animais');
  }
};