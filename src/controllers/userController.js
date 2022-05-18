const path = require("path");
const fs = require("fs");

const { validationResult } = require("express-validator");
const User = require("../models/User");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	register: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario pero aun no vimos como hacer esto
	login: (req, res) => {
		res.render("index");
	},
	forgotPassword: (req, res) => {
		res.send("Revise su correo electronico");
	},
	save: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("register", {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
		if (req.params.id) User.edit(req.params.id, req);
		else User.create(req);
		res.redirect("/");
	},
};

module.exports = userController;
