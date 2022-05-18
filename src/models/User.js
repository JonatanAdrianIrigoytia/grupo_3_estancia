const fs = require("fs");
const path = require("path");
let User = {
	filepath: path.resolve(__dirname, "../data/users.json"),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.filepath, "utf-8"));
	},
	generateId: function (users) {
		if (!users) users = this.findAll();
		let id = 1;
		if (users.length > 0) id = users.at(-1).id + 1;
		return id;
	},

	findAll: function () {
		return this.getData();
	},
	findById: function (id, users = undefined) {
		if (!users) users = this.findAll();
		let userFound = users.find((user) => user.id == id);
		return userFound;
	},
	findByField: function (field, value, users = undefined) {
		if (!users) users = this.findAll();
		let userFound = users.find((user) => user[field] === value);
		return userFound;
	},

	create: function (userData, filename) {
		let users = this.findAll();
		let id = this.generateId(users);
		let user = fillUserData(id, userData, filename);
		users.push(user);
		fs.writeFileSync(this.filepath, JSON.stringify(users), null, " ");
	},
	edit: function (id, userData, filename) {
		let editedUser = fillUserData(id, userData, filename);
		let users = this.findAll();
		// let index = users.findIndex((user) => user.id == id);
		let userTobeEdited = this.findById(id, users);
		userTobeEdited = editedUser;
		fs.writeFileSync(this.filepath, JSON.stringify(users));
	},
	delete: function (id) {
		let users = this.findAll();
		let index = this.findIndexByID(id, users);
		users.splice(index, 1);
		fs.writeFileSync(this.filepath, JSON.stringify(users, null, " "));
	},
	fillUserData: function (id, userData, filename) {
		let user = {
			id: id,
			name: userData.name,
			lastName: userData.lastName,
			email: userData.email,
			password: userData.password,
			category: "user",
			image: filename ? `/users/${filename}` : "default-image.png",
		};
		return user;
	},
};

module.exports = User;
