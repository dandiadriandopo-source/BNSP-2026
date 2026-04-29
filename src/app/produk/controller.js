const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const {
  createNewProduk,
  getAllProduk,
  existIdProduk,
  updateProdukById,
  deleteProdukById,
} = require("./service");
const { resSuccess, resFailed } = require("../../shared/helpers/payload");

const addProduk = async (req, res) => {
  try {
    const { nama_produk, harga, kategori, stok } = req.body;

    const body = {
      nama_produk,
      harga,
      kategori,
      stok,
    };

    const data = await createNewProduk(body);
    return resSuccess(
      res,
      200,
      "success",
      "Data produk berhasil ditambah",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findAllProduk = async (req, res) => {
  try {
    const data = await getAllProduk();
    return resSuccess(
      res,
      200,
      "success",
      "Data produk berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findProdukById = async (req, res) => {
  try {
    const data = await existIdProduk();

    if (!data) {
      return resFailed(res, 404, "error", "Data produk tidak ditemukan");
    }

    return resSuccess(
      res,
      200,
      "success",
      "Data produk berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const editProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, harga, kategori, stok } = req.body;

    const isProdukExist = await existIdProduk(id);
    if (!isProdukExist || isProdukExist === null) {
      return resFailed(res, 404, "error", "Data produk tidak ditemukan");
    }

    const body = {
      nama_produk,
      harga,
      kategori,
      stok,
    };

    const data = await updateProdukById(id, body);
    return resSuccess(
      res,
      200,
      "success",
      "Data produk berhasil diupdate",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const dropProdukById = async (req, res) => {
  try {
    const { id } = req.params;

    const isProdukExist = await existIdProduk(id);

    if (!isProdukExist || isProdukExist === null) {
      return resFailed(res, 404, "error", "Data produk tidak ditemukan");
    }

    const data = await deleteProdukById(id);
    return resSuccess(res, 200, "success", "User berhasil dihapus", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  addProduk,
  findAllProduk,
  editProdukById,
  dropProdukById,
  findProdukById,
};
