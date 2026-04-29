const express = require("express");
const {
  regUser,
  findAllUser,
  editUserById,
  dropUserById,
} = require("./controller");
const { authJwt, authorizeRole } = require("../auth/jwtAuth");
const routerUser = express.Router();

routerUser.post("/", authJwt, authorizeRole("user", "admin"), regUser);
routerUser.get("/", authJwt, authorizeRole("user", "admin"), findAllUser);
routerUser.patch("/:id", authJwt, authorizeRole("user", "admin"), editUserById);
routerUser.delete("/:id", authJwt, authorizeRole("admin"), dropUserById);

module.exports = routerUser;
