const express = require("express");
const userController = require("../../controllers/api/userAPIController");
const router = express.Router();


router.get("/:page?", userController.list);
router.get("/detail/:id", userController.detail);
module.exports = router;