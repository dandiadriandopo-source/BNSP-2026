"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaksi.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Transaksi.belongsTo(models.Produk, {
        foreignKey: "produk_id",
        as: "produk",
      });
    }
  }
  Transaksi.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      produk_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "produk",
          key: "id",
        },
      },
      tanggal: {
        type: DataTypes.DATE,
      },
      total: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Transaksi",
      tableName: "transaksi",
    },
  );
  return Transaksi;
};
