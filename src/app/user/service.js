const { User } = require("../../models");

// =================================================================
// ----------------------------C-R-U-D------------------------------
// =================================================================

const createNewUser = async (body) => {
  return await User.create(body);
};

const getAllUser = async () => {
  return await User.findAll();
};

const updateUserById = async (id, body) => {
  const data = await User.findByPk(id);
  return data.update(body);
};

const deleteUserById = async (id) => {
  return await User.destroy({ where: { id } });
};

// =================================================================
// ---------------------------H-E-L-P-E-R---------------------------
// =================================================================

const existId = async (id) => {
  return await User.findByPk(id);
};

const existUser = async (username) => {
  return await User.findOne({ where: { username } });
};

module.exports = {
  createNewUser,
  getAllUser,
  updateUserById,
  deleteUserById,
  existId,
  existUser,
};
