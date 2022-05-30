const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const multerMiddleware = require("../middlewares/multerMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
// ************ Multer Configuration ************\

router.get("/login", guestMiddleware, userController.renderLogin);
router.get("/register", guestMiddleware, userController.register);
router.get("/forgot-password", guestMiddleware, userController.forgotPassword);
router.get("/profile/:id", authMiddleware, userController.profile);
router.get("/profile", authMiddleware, userController.profile);
router.get("/edit/:id", userController.editProfile);
router.post("/login", userController.login);
router.post(
	"/register",
	multerMiddleware.user.single("image"),
	validationMiddleware.userRegisterValidations,
	userController.save,
);
router.delete("/:id", adminMiddleware, userController.delete);
router.put(
	"/:id",
	authMiddleware,
	multerMiddleware.user.single("image"),
	userController.save,
);
//logout
router.get("/logout", userController.logout);


module.exports = router;
