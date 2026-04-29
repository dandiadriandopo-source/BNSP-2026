const express = require("express");
const {
  addProduk,
  findAllProduk,
  editProdukById,
  dropProdukById,
  findProdukById,
} = require("./controller");
const { authJwt, authorizeRole } = require("../auth/jwtAuth");
const routerProduk = express.Router();

routerProduk.post("/", authJwt, authorizeRole("user", "admin"), addProduk);
routerProduk.get("/", authJwt, authorizeRole("user", "admin"), findAllProduk);
routerProduk.get(
  "/:id",
  authJwt,
  authorizeRole("user", "admin"),
  findProdukById,
);
routerProduk.patch("/:id", authJwt, authorizeRole("admin"), editProdukById);
routerProduk.delete("/:id", authJwt, authorizeRole("admin"), dropProdukById);

module.exports = routerProduk;
