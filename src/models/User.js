const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const bcrypt = require("bcryptjs");
const errorHelper = require("../helpers/errorHelper");
let User = {
	findAll: async function () {
		return await db.User.findAll({
			include: ["role"],
		});
	},
	findById: async function (id) {
		return await db.User.findByPk(id, {
			include: ["role"],
		});
	},
	findByField: async function (field, value) {
		let user = await db.User.findOne({
			include: ["role"],
			where: { [field]: value },
		});
		console.log(user);
		return user;
	},
	login: async function (userData) {
		let loggedUser = await this.findByField("email", userData.email);
		let errors = undefined;
		if (!loggedUser)
			errors = errorHelper.fillErrors([
				{ field: "email", msg: "Credenciales inválidas" },
				{ field: "password", msg: "Credenciales inválidas" },
			]);
		else if (!bcrypt.compareSync(userData.password, loggedUser.password)) {
			errors = errorHelper.fillErrors([
				{ field: "email", msg: "Credenciales inválidas" },
				{ field: "password", msg: "Credenciales inválidas" },
			]);
			loggedUser = undefined;
		}
		return { errors, loggedUser };
	},
	create: async function (userData, filename) {
		//Validando si el usuarios ya existe
		if (await this.findByField("email", userData.email)) {
			return {
				errors: errorHelper.fillErrors([
					{
						field: "email",
						msg: "Ya hay un usuario con ese email",
					},
				]),
				id: undefined,
			};
		}
		let { errors, user } = this.fillUserData(userData, filename);
		if (errors) return { errors, id: undefined };
		try {
			let userCreated = await db.User.create(user);
			return { errors: undefined, id: userCreated.id };
		} catch (error) {
			console.log(error);
		}
	},
	edit: async function (id, userData, filename) {
		let userTobeEdited = users[index];
		let { errors, editedUser } = this.fillUserData(
			userData,
			filename,
			userTobeEdited,
		);
		if (errors) return { errors, id: undefined };
		try {
			await db.User.update(editedUser, {
				where: { id: id },
				include: ["role"],
			});
			return { errors: undefined, id: id };
		} catch (e) {
			console.log(e);
		}
	},
	delete: async function (id) {
		return await db.User.destroy({ where: { id: id } });
	},
	fillUserData: function (userData, filename, currentData = undefined) {
		let { errors, password } = encryptPassword(userData, currentData);

		if (errors) {
			return { erorrs, user: undefined };
		}
		let user = {
			firstName: userData.firstName
				? userData.firstName
				: currentData.firstName,
			lastName: userData.lastName ? userData.lastName : currentData.lastName,
			email: userData.email ? userData.email : currentData.email,
			password: password,
			roleId: 1,
		};
		if (currentData && currentData.image && !filename)
			user.image = currentData.image;
		else if (filename) user.image = `/users/${filename}`;
		else user.image = "default-user-image.png";
		return { errors: undefined, user };
	},
};
function encryptPassword(userData, currentData) {
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
				errors = errorHelper.fillErrors([
					{ field: "currentPassword", msg: "Las contraseñas no coinciden" },
					{ field: "password", msg: "Las contraseñas no coinciden" },
					{ field: "confirmPassword", msg: "Las contraseñas no coinciden" },
				]);
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
}

function validatePasswordConfirmation(password, confirmPassword) {
	let errors = undefined;
	if (password != confirmPassword) {
		errors = errorHelper.fillErrors([
			{ field: "password", msg: "Las contraseñas no coinciden" },
			{ field: "confirmPassword", msg: "Las contraseñas no coinciden" },
		]);
	}
	return errors;
}
module.exports = User;
