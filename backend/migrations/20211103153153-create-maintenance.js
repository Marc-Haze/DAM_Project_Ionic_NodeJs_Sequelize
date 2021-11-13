'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('maintenances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      dock: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
             model: 'employees',
             key: 'id'
        },
      },
      shipId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
             model: 'ships',
             key: 'id'
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('maintenances');
  }
};