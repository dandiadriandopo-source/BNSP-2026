const express = require("express");
const {
  addTransaksi,
  findAllTransaksi,
  editTransaksiById,
  dropTransaksiById,
} = require("./controller");
const { authJwt, authorizeRole } = require("../auth/jwtAuth");
const routerTransaksi = express.Router();

routerTransaksi.post(
  "/",
  authJwt,
  authorizeRole("user", "admin"),
  addTransaksi,
);
routerTransaksi.get(
  "/",
  authJwt,
  authorizeRole("user", "admin"),
  findAllTransaksi,
);
routerTransaksi.patch(
  "/:id",
  authJwt,
  authorizeRole("user", "admin"),
  editTransaksiById,
);
routerTransaksi.delete(
  "/:id",
  authJwt,
  authorizeRole("admin"),
  dropTransaksiById,
);

module.exports = routerTransaksi;
