const path = require("path");
const fs = require("fs");
const { check } = require("express-validator");

const userRegisterValidations = [
	check("name").notEmpty().withMessage("Debe ingresar un nombre"),
	check("lastName").notEmpty().withMessage("Debe ingresar un apellido"),
	check("email")
		.notEmpty()
		.withMessage("Debe ingresar un email")
		.bail()
		.isEmail()
		.withMessage("Debe ingresar un formato de email valido"),
	check("password")
		.notEmpty()
		.withMessage("Debe ingresar una contraseña")
		.bail()
		.isLength({ min: 5 })
		.withMessage("La contraseña debe tener como mínimo 5 caracteres"),
	check("password2")
		.notEmpty()
		.withMessage("Debe confirmar su contraseña")
		.bail()
		.isLength({ min: 5 })
		.withMessage("La contraseña debe tener como mínimo 5 caracteres"),
	check("image").custom((value, { req }) => {
		if (!req.file) return true;
		let file = req.file;
		let acceptedExtensions = [".jpg", ".png"];
		let fileExtension = path.extname(file.originalname);
		if (!acceptedExtensions.includes(fileExtension)) {
			throw new Error(
				`los formatos permitidos son ${acceptedExtensions.join(", ")}`,
			);
		}
	}),
];

module.exports = { userRegisterValidations };
