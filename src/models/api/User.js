const db = require("../../database/models");
const userIncludes = [
	{ model: db.Role, as: "Role" },
];

const User = {
	findAll: async function (page = undefined) {
		return await db.User.findAndCountAll({
			include: [{ model: db.Role, as: "Role" }],
			attributes: { exclude: ["image", "role.id"] },
			
		});
       
    }
}

module.exports = User; 