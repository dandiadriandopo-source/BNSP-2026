"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("regency", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(4),
      },
      province_id: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        references: {
          model: "province",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("regency");
  },
};
