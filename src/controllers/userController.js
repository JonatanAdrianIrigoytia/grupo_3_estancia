const { validationResult } = require("express-validator");
const User = require("../models/User");
const fs = require("fs");
const { timeConverter } = require("../helpers/timeConverter");
const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	register: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario (SPRINT 5)
	login: (req, res) => {
		//Aca hay que llamar al metodo login que va a estar en el modelo del usuario
		// let {errors, loggedUser} = User.login(req.body)
		// if (errors)
		// 	return res.render("login", {oldData: req.body, errors});
		delete loggedUser.password;
		req.session.loggedUser = loggedUser;
		if (req.body.rememberme)
			res.cookie("userEmail", loggedUser.email, {
				maxAge: timeConverter(1, "days"),
			});
		res.redirect("/");
	},
	forgotPassword: (req, res) => {
		res.send("Revise su correo electronico");
	},
	profile: (req, res) => {
		if (req.params.id) {
			let user = User.findById(req.params.id);
			if (user) return res.render("profile", { user });
		} else if (!req.params.id && req.session.loggedUser)
			return res.render("profile", { user: req.session.loggedUser });
		res.redirect("/");
	},
	editProfile: (req, res) => {
		let user = User.findById(req.params.id);
		if (user) return res.render("editProfile", { user });
		res.redirect("/");
	},
	save: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			if (req.file) fs.unlinkSync(req.file.path);
			return res.render("register", {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}

		let errors, id;
		if (req.params.id) {
			({ errors, id } = User.edit(
				req.params.id,
				req.body,
				req.file ? req.file.filename : undefined,
			));
		} else {
			({ errors, id } = User.create(
				req.body,
				req.file ? req.file.filename : undefined,
			));
		}
		if (errors) {
			if (req.params.id) {
				return res.render("editProfile", {
					errors: errors,
					oldData: req.body,
				});
			}
			return res.render("register", {
				errors: errors,
				oldData: req.body,
			});   
		}
		res.redirect(id ? `/users/profile/${id}` : "/");
	},

	delete: (req, res) => {
		User.delete(req.params.id);
		res.redirect("/");
	},

	logout: (req,res)=>{
		//borra todo lo que hay en sesion 
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = userController;
