"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Province, {
        foreignKey: "province_id",
        as: "province",
      });
      this.belongsTo(models.Regency, {
        foreignKey: "regency_id",
        as: "regency",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "user"),
      password: DataTypes.STRING,
      province_id: DataTypes.CHAR(10),
      regency_id: DataTypes.CHAR(10),
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    },
  );
  return User;
};
