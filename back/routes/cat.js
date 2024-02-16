const express = require("express");
const router = express.Router();
const catController = require("../controller/catController");

router.get("/", catController.getAllCats);

module.exports = router;