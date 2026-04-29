"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regency extends Model {
    static associate(models) {
      this.belongsTo(models.Province, {
        foreignKey: "province_id",
        as: "province",
      });
      this.hasMany(models.User, { foreignKey: "regency_id", as: "user" });
    }
  }
  Regency.init(
    {
      id: {
        type: DataTypes.CHAR(4),
        primaryKey: true,
        allowNull: false,
      },
      province_id: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Regency",
      tableName: "regency",
      timestamps: false,
    },
  );
  return Regency;
};
