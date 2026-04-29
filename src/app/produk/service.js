const { Produk } = require("../../models");

const createNewProduk = async (body) => {
  return await Produk.create(body);
};

const getAllProduk = async () => {
  return await Produk.findAll();
};

const updateProdukById = async (id, body) => {
  const data = await Produk.findByPk(id);
  return data.update(body);
};

const deleteProdukById = async (id) => {
  return await Produk.destroy({ where: { id } });
};

const existIdProduk = async (id) => {
  return await Produk.findByPk(id);
};

const existProduk = async (nama_produk) => {
  return await Produk.findOne({ where: { nama_produk } });
};

module.exports = {
  createNewProduk,
  getAllProduk,
  updateProdukById,
  deleteProdukById,
  existIdProduk,
  existProduk,
  existIdProduk,
};
