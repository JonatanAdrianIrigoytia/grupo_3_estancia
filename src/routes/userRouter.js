const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/login", userController.renderLogin);
router.get("/register", userController.renderRegister);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
