const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const {
  createNewUser,
  getAllUser,
  existId,
  updateUserById,
  deleteUserById,
} = require("./service");
const { resSuccess, resFailed } = require("../../shared/helpers/payload");

// =================================================================
// ----------------------------C-R-U-D------------------------------
// =================================================================

const regUser = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    const saltRounds = 14;
    const hashpass = await bcrypt.hash(password, saltRounds);

    const body = {
      username,
      email,
      role,
      password: hashpass,
    };

    const data = await createNewUser(body);
    return resSuccess(res, 201, "success", "User berhasil dibuat", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findAllUser = async (req, res) => {
  try {
    const data = await getAllUser();
    return resSuccess(
      res,
      200,
      "success",
      "Data user berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const editUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, google_id, profil, role, status_member } =
      req.body;

    const saltRounds = 14;
    let hashpass = null;
    if (password) {
      hashpass = await bcrypt.hash(password, saltRounds);
    }

    const isUserExist = await existId(id);
    if (!isUserExist || isUserExist === null) {
      return resFailed(res, 404, "error", "Data user tidak ditemukan");
    }

    if (!hashpass) {
      hashpass = isUserExist.password;
    }

    let newProfil = null;
    if (req.file) {
      newProfil = req.file.path.split("/")[7];
    }

    if (newProfil) {
      if (isUserExist.profil) {
        const filePath = path.join(
          process.cwd(),
          "src",
          "upload",
          isUserExist.profil,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } else {
      newProfil = isUserExist.profil;
    }

    const body = {
      name,
      email,
      password: hashpass,
      google_id,
      profil: newProfil,
      role,
      status_member,
    };

    const data = await updateUserById(id, body);
    return resSuccess(res, 200, "success", "Data user berhasil diupdate", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const dropUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const isUserExist = await existId(id);

    if (!isUserExist || isUserExist === null) {
      return resFailed(res, 404, "error", "Data user tidak ditemukan");
    }

    if (isUserExist.profil) {
      const filePath = path.join(
        process.cwd(),
        "src",
        "upload",
        isUserExist.profil,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const data = await deleteUserById(id);
    return resSuccess(res, 200, "success", "User berhasil dihapus", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  regUser,
  findAllUser,
  editUserById,
  dropUserById,
};
