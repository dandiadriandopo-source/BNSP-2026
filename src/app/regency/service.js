const { Regency, Province } = require("../../models");

const createRegency = async (data) => {
  return await Regency.create(data);
};

const getAllRegency = async () => {
  return await Regency.findAll({
    include: [
      {
        model: Province,
        attributes: ["id", "nama"],
      },
    ],
    order: [["id", "ASC"]],
  });
};

const getRegencyById = async (id) => {
  return await Regency.findOne({
    where: { id },
    include: Province,
  });
};

const updateRegency = async (id, data) => {
  return await Regency.update(data, {
    where: { id },
  });
};

const deleteRegency = async (id) => {
  return await Regency.destroy({
    where: { id },
  });
};

const getRegencyByProvince = async (provinceId) => {
  return await Regency.findAll({
    where: { provinceId },
    order: [["nama", "ASC"]],
  });
};

module.exports = {
  createRegency,
  getAllRegency,
  getRegencyById,
  updateRegency,
  deleteRegency,
  getRegencyByProvince,
};
