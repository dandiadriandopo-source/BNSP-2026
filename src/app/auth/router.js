const express = require("express");
const { regUser } = require("../user/controller");
const { loginAuth } = require("./auth");
const { valLog } = require("./jwtAuth");
const routerAuth = express.Router();

routerAuth.post("/register", regUser);
routerAuth.post("/login", valLog, loginAuth);

module.exports = routerAuth;
