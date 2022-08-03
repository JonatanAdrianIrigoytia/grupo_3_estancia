const User = require("../../models/api/User");

const userController = {
    list: async (req, res) => {
		page = req.params.page ? parseInt(req.params.page) : undefined;
		const result = await User.findAll(page);
		let users = result.rows;
		const total = result.count;

		if (users.length > 0) {
			users = users.map((user) => {
				fillCountByCategory(user, countByCategory);
				return {
					id: user.id,
					firstName: user.firstName,
				    lastName: user.lastName,
                    email: user.email,
					detail: `http://localhost:3001/api/users/detail/${user.id}`,
					...(total > page * 10 && {
						next: `http://localhost:3001/api/users/${page + 1}`,
					}),
					...(page &&
						page > 1 && {
							prev: `http://localhost:3001/api/users/${page - 1}`,
						}),
				};
			});
			return res.json({ count: total, users });
		}
		return res.status(404).json({ message: "No se encontraron usuarios" });
	},

	detail: async (req, res) => {
		let user = await User.findById(req.params.id);

		if (user) {
			let formattedUser = {
				id: user.id,
					firstName: user.firstName,
				    lastName: user.lastName,
                    email: user.email
				
			};

			res.json({ user: formattedUser });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	},
};



module.exports = userController;

