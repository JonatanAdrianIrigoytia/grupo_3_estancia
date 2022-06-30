const path = require("path");
const { check } = require("express-validator");

const userRegisterValidations = [
	check("firstName").notEmpty().withMessage("Debe ingresar un nombre"),
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
	check("confirmPassword")
		.notEmpty()
		.withMessage("Debe confirmar su contraseña")
		.bail()
		.isLength({ min: 5 })
		.withMessage("La contraseña debe tener como mínimo 5 caracteres"),
];

module.exports = { userRegisterValidations };
