const { Province } = require("../../models");

const createProvince = async (data) => {
  return await Province.create(data);
};

const getAllProvince = async () => {
  return await Province.findAll({
    order: [["id", "ASC"]],
  });
};

const getProvinceById = async (id) => {
  return await Province.findOne({
    where: { id },
  });
};

const updateProvince = async (id, data) => {
  return await Province.update(data, {
    where: { id },
  });
};

const deleteProvince = async (id) => {
  return await Province.destroy({
    where: { id },
  });
};

module.exports = {
  createProvince,
  getAllProvince,
  getProvinceById,
  updateProvince,
  deleteProvince,
};
