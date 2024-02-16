const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.get("/", taskController.getAllTasks);

router.post("/add", taskController.add);

router.post("/delete", taskController.delete);

router.post("/update", taskController.update);

router.get("/info", taskController.getInfo);

module.exports = router;