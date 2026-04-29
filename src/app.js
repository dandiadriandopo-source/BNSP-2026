require("dotenv").config();

const cors = require("cors");
const express = require("express");
const sequelize = require("./config/koneksi");
const routerAuth = require("./app/auth/router");
const routerUser = require("./app/user/router");
const routerProduk = require("./app/produk/router");
const routerTransaksi = require("./app/Transaksi/router");
const routerProvince = require("./app/province/router");
const routerRegency = require("./app/regency/router");

const app = express();

const PORT = 4014;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ nassage: "Koneksi Berhasil Terhubung" });
  } catch (error) {
    return res
      .status(500)
      .json({ nassage: "Koneksi Gagal Terhubung: " + error.message });
  }
});

app.use("/auth", routerAuth);
app.use("/user", routerUser);
app.use("/produk", routerProduk);
app.use("/transaksi", routerTransaksi);
app.use("/province", routerProvince);
app.use("/regency", routerRegency);

app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Maaf, halaman tidak ditemukan",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
