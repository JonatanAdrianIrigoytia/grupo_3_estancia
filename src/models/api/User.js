const db = require("../../database/models");

const User = {
	findAll: async function (page = undefined) {
		let limit = undefined;
		let offset = undefined;
		if (page) {
			limit = 10;
			offset = (page - 1) * limit;
		}
		return await db.User.findAndCountAll({
			attributes: { exclude: ["image", "role.id"] },
			limit,
			offset,
		});
	},
	findById: async function (id) {
		return await db.User.findByPk(id);
	},
};

module.exports = User;
