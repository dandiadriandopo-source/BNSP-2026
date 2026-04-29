const {
  createProvince,
  getAllProvince,
  getProvinceById,
  updateProvince,
  deleteProvince,
} = require("./service");

const create = async (req, res) => {
  try {
    const result = await createProvince(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await getAllProvince();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await getProvinceById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    await updateProvince(req.params.id, req.body);
    res.json({ message: "Province updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    await deleteProvince(req.params.id);
    res.json({ message: "Province deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};
