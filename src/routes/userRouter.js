const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const multerMiddleware = require("../middlewares/multerMiddleware");

// ************ Multer Configuration ************\

router.get("/login", userController.renderLogin);
router.get("/register", userController.register);
router.get("/forgot-password", userController.forgotPassword);
router.get("/profile/:id", userController.profile);
router.post("/login", userController.login);
router.post(
	"/register",
	multerMiddleware.user.single("image"),
	userController.save,
);
router.put("/:id", multerMiddleware.user.single("image"), userController.save);

module.exports = router;
