const db = require("../../database/models");
const productIncludes = [
	{ model: db.Category, as: "category" },
	{
		model: db.Amenity,
		as: "amenities",
		trough: { attributes: [] },
	},
	{
		model: db.Service,
		as: "services",
		trough: { attributes: [] },
	},
];
const Product = {
	findAll: async function (page = undefined) {
		let limit = undefined;
		let offset = undefined;
		if (page) {
			limit = 10;
			offset = (page - 1) * limit;
		}
		return await db.Product.findAndCountAll({
			include: [{ model: db.Category, as: "category" }],
			attributes: { exclude: ["image", "category.id"] },
			limit,
			offset,
		});
	},
	findLast: async function () {
		return await db.Product.findOne({
			order: [["createdAt", "DESC"]],
			include: [{ model: db.Category, as: "category" }],
			attributes: { exclude: ["category.id"] },
		});
	},
	findById: async function (id) {
		return await db.Product.findByPk(id, {
			include: productIncludes,
		});
	},
};

module.exports = Product;
