const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
let User = {
	filepath: path.resolve(__dirname, "../data/users.json"),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.filepath, "utf-8"));
	},
	generateId: function (users) {
		if (!users) users = this.findAll();
		if (users.length > 0) id = users[users.length - 1].id + 1; //users.at(-1).id soportado a patir de Node.js 16.6.0
		return id;
	},

	findAll: function () {
		return this.getData();
	},
	findById: function (id, users = undefined) {
		if (!users) users = this.findAll();
		id = parseInt(id);
		let userFound = users.find((user) => user.id == id);
		return userFound;
	},
	findByField: function (field, value, users = undefined) {
		if (!users) users = this.findAll();
		let userFound = users.find((user) => user[field] === value);
		return userFound;
	},
	findIndexByID: function (id, users = undefined) {
		if (!users) users = this.findAll();
		let userIndex = users.findIndex((user) => user.id == id);
		return userIndex;
	},

	create: function (userData, filename) {
		let users = this.findAll();
		let id = this.generateId(users);
		let { errors, user } = this.fillUserData(id, userData, filename);
		if (errors) return { errors, id: undefined };
		users.push(user);
		fs.writeFileSync(this.filepath, JSON.stringify(users), null, " ");
		return { errors: undefined, id };
	},
	edit: function (id, userData, filename) {
		let users = this.findAll();
		let index = users.findIndex((user) => user.id == id);
		let userTobeEdited = users[index];
		let { errors, editedUser } = this.fillUserData(
			id,
			userData,
			userTobeEdited,
			filename,
		);
		if (errors) return { errors, id: undefined };
		users[index] = editedUser;
		fs.writeFileSync(this.filepath, JSON.stringify(users));
		return { errors: undefined, id: userTobeEdited.id };
	},
	delete: function (id) {
		let users = this.findAll();
		let index = this.findIndexByID(id, users);
		users.splice(index, 1);
		fs.writeFileSync(this.filepath, JSON.stringify(users, null, " "));
	},
	fillUserData: function (id, userData, currentData = undefined, filename) {
		let { errors, password } = this.encryptPassword(userData, currentData);
		if (errors) {
			return { errors, user: undefined };
		}
		let user = {
			id: parseInt(id),
			name: userData.name ? userData.name : currentData.name,
			lastName: userData.lastName ? userData.lastName : currentData.lastName,
			email: userData.email ? userData.email : currentData.email,
			password: password,
			category: "user",
		};
		if (currentData && currentData.image && !filename)
			user.image = currentData.image;
		else if (filename) user.image = `/users/${filename}`;
		else user.image = "default-user-image.png";
		return { errors: undefined, user };
	},

	encryptPassword: function (userData, currentData) {
		let errors = {};
		if (currentData && userData.changePassword) {
			if (
				userData.currentPassword &&
				userData.password &&
				userData.confirmPassword
			) {
				//Si la clave y su confirmacion no coinciden devuelvo error en el formato de express-validator
				let validation = validatePasswordConfirmation(
					userData.password,
					userData.confirmPassword,
				);
				if (validation) return { errors: validation, password: undefined };
				else if (
					//Si la clave ingresada en el formulario y la que esta actualmente en la DB no coinciden
					//devuelvo error en el formato de express-validator
					!bcrypt.compareSync(userData.currentPassword, currentData.password)
				) {
					errors = {
						currentPassword: {
							msg: "Las contraseñas no coinciden",
						},

						password: {
							msg: "Las contraseñas no coinciden",
						},

						confirmPassword: {
							msg: "Las contraseñas no coinciden",
						},
					};
					return { errors, password: undefined };
				}
				//Si no encontre errores devuelvo errors como undifined y la clave hasheada
				return {
					errors: undefined,
					password: bcrypt.hashSync(userData.password),
				}; // Devolver encriptado
			}
		} else if (currentData && !userData.changePassword)
			return currentData.password;
		else {
			let validation = validatePasswordConfirmation(
				userData.password,
				userData.confirmPassword,
			);
			if (validation) return { errors: validation, password: undefined };
			//No hay datos actuales es una creacion entonces encripto la clave
			return {
				errors: undefined,
				password: bcrypt.hashSync(userData.password),
			};
		}
	},
};

function validatePasswordConfirmation(password, confirmPassword) {
	let errors = undefined;
	if (password != confirmPassword) {
		errors = {
			password: {
				msg: "Las contraseñas no coinciden",
			},

			confirmPassword: {
				msg: "Las contraseñas no coinciden",
			},
		};
	}
	return errors;
}

module.exports = User;
