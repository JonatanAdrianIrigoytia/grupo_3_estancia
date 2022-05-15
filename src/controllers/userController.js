const path = require("path");
const fs = require("fs");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	renderRegister: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario pero aun no vimos como hacer esto
	login: (req, res) => {
		res.render("index");
	},
	//El login no va a hacer esto sino que deberia registrar al usuario en la base de datos
	register: (req, res) => {
		res.render("index");
	},
	forgotPassword: (req, res) => {
		res.send("Revise su correo electronico");
	},
	save: (req, res) => {
		if (req.params.id) edit(req.params.id, req);
		else create(req);
		res.redirect("/");
	},
};

function edit(id, req) {
	let editedUser = fillUserData(id, req);
	let index = users.findIndex((user) => user.id == id);
	users[index] = editedUser;
	fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

function create(req) {
	let id = 1;
	if (users.length > 0) id = users.at(-1).id + 1;
	let user = fillUserData(id, req);
	users.push(user);
	fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

function fillUserData(id, req) {
	let user = {
		id: id,
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		isAdmin: false,
		image: req.file ? `/users/${req.file.filename}` : "default-image.png",
	};
	return user;
}

module.exports = userController;
