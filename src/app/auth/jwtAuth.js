const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { existUser } = require("../user/service");
const { resFailed } = require("../../shared/helpers/payload");

const valLog = async (req, res, next) => {
  const { username, password } = req.body;

  const searchUser = await existUser(username);

  if (!searchUser) {
    return resFailed(res, 404, "error", "Maaf, akun tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(password, searchUser.password);

  if (!isMatch) {
    return resFailed(res, 401, "error", "Maaf, password salah");
  }

  const token = jwt.sign(
    {
      id: searchUser.id,
      username: searchUser.username,
      role: searchUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    },
  );

  const body = {
    id: searchUser.id,
    name: searchUser.username,
    role: searchUser.role,
  };

  req.user = body;
  req.token = token;

  next();
};

const authJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return resFailed(
        res,
        401,
        "error",
        "Maaf, token tidak ditemukan, silahkan login",
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return resFailed(
        res,
        401,
        "error",
        "Maaf, token tidak valid atau kadaluarsa",
      );
    }
    req.user = decoded;

    next();
  } catch (error) {
    return resFailed(
      res,
      401,
      "error",
      "Maaf, token tidak valid atau kadaluarsa",
    );
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return resFailed(res, 403, "error", "Maaf, akses ditolak");
    }

    if (!roles.includes(req.user.role)) {
      return resFailed(res, 403, "error", "Maaf, akses ditolak");
    }

    next();
  };
};

module.exports = { valLog, authJwt, authorizeRole };
