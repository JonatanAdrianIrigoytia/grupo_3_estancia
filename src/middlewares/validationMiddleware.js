const path = require("path");
const { check } = require("express-validator");

const userRegisterValidations = [
	check("name").notEmpty().withMessage("tienes que escribir un nombre"),
	check("lastName").notEmpty().withMessage("tienes que escribir un apellido"),
	check("email")
		.notEmpty()
		.withMessage("tienes que escribir un email")
		.bail()
		.isEmail()
		.withMessage("debes escribir un formato de email valido"),
	check("password")
		.notEmpty()
		.withMessage("tienes que escribir una contraseña"),
	check("password2")
		.notEmpty()
		.withMessage("tienes que escribir una contraseña"),
	check("image").custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = [".jpg", ".png"];
		if (!file) {
			throw new Error("tienes que subir una imagen");
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(
					`los formatos permitidos son ${acceptedExtensions.join(", ")}`,
				);
			}
		}
		return true;
	}),
];

module.exports = { userRegisterValidations };
