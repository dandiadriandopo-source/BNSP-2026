const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);
router.get("/by-province", controller.getByProvince);

module.exports = router;
