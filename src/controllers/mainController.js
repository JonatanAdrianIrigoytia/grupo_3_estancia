const Product = require("../models/Product");

const mainController = {
	home: async (req, res) => {
		const rooms = await Product.findByCategory("room");
		const activities = await Product.findByCategory("activity");
		res.render("index", { rooms, activities, selected: rooms[0] });
	},
};

module.exports = mainController;
