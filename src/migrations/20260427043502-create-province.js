"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("province", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(2),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("province");
  },
};
