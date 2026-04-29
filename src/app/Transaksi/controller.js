const { resSuccess, resFailed } = require("../../shared/helpers/payload");
const {
  createNewTransaksi,
  getAllTransaksi,
  existIdTransaksi,
  updateTransaksiById,
  deleteTransaksiById,
} = require("./service");

const addTransaksi = async (req, res) => {
  try {
    const { user_id, produk_id, tanggal, total } = req.body;

    const body = {
      user_id,
      produk_id,
      tanggal,
      total,
    };

    const data = await createNewTransaksi(body);
    return resSuccess(
      res,
      200,
      "success",
      "Data transaksi berhasil ditambah",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findAllTransaksi = async (req, res) => {
  try {
    const data = await getAllTransaksi();
    return resSuccess(
      res,
      200,
      "success",
      "Data transaksi berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const editTransaksiById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, produk_id, tanggal, total } = req.body;

    const isTransaksiExist = await existIdTransaksi(id);
    if (!isTransaksiExist || isTransaksiExist === null) {
      return resFailed(res, 404, "error", "Data Transaksi tidak ditemukan");
    }

    const body = {
      user_id,
      produk_id,
      tanggal,
      total,
    };

    const data = await updateTransaksiById(id, body);
    return resSuccess(
      res,
      200,
      "success",
      "Data Transaksi berhasil diupdate",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const dropTransaksiById = async (req, res) => {
  try {
    const { id } = req.params;

    const isTransaksiExist = await existIdTransaksi(id);

    if (!isTransaksiExist || isTransaksiExist === null) {
      return resFailed(res, 404, "error", "Data Transaksi tidak ditemukan");
    }

    const data = await deleteTransaksiById(id);
    return resSuccess(res, 200, "success", "User berhasil dihapus", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  addTransaksi,
  findAllTransaksi,
  editTransaksiById,
  dropTransaksiById,
};
