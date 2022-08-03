const db = require("../../database/models");


const User = {
	findAll: async function (page = undefined) {
		return await db.User.findAndCountAll({
			attributes: { exclude: ["image", "role.id"] }
			
		});
	},
	findById: async function (id) {
		return await db.User.findByPk(id);
	},
}

module.exports = User; 