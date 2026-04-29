"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      this.hasMany(models.Regency, {
        foreignKey: "province_id",
        as: "regency",
      });
      this.hasMany(models.User, { foreignKey: "province_id", as: "user" });
    }
  }
  Province.init(
    {
      id: {
        type: DataTypes.CHAR(2),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Province",
      tableName: "province",
      timestamps: false,
    },
  );
  return Province;
};
