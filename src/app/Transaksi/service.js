const { Transaksi } = require("../../models");

const createNewTransaksi = async (body) => {
  return await Transaksi.create(body);
};

const getAllTransaksi = async () => {
  return await Transaksi.findAll();
};

const updateTransaksiById = async (id, body) => {
  const data = await Transaksi.findByPk(id);
  return data.update(body);
};

const deleteTransaksiById = async (id) => {
  return await Transaksi.destroy({ where: { id } });
};

const existIdTransaksi = async (id) => {
  return await Transaksi.findByPk(id);
};

module.exports = {
  createNewTransaksi,
  getAllTransaksi,
  updateTransaksiById,
  deleteTransaksiById,
  existIdTransaksi,
  existIdTransaksi,
};
