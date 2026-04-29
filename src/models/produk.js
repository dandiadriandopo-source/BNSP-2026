"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produk.hasMany(models.Transaksi, {
        foreignKey: "produk_id",
        as: "produk",
      });
    }
  }
  Produk.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_produk: {
        type: DataTypes.STRING,
      },
      harga: {
        type: DataTypes.INTEGER,
      },
      kategori: {
        type: DataTypes.ENUM("elektronik", "furniture"),
      },
      stok: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Produk",
      tableName: "produk",
    },
  );
  return Produk;
};
