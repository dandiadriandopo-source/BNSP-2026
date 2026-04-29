const { resLogin, resFailed } = require("../../shared/helpers/payload");

const loginAuth = async (req, res) => {
  try {
    const token = req.token;

    const data = {
      token,
      user: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
      },
    };

    return resLogin(res, 200, "success", "Login berhasil", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = { loginAuth };
