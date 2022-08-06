const Product = require("../../models/api/Product");

const productController = {
	list: async (req, res) => {
		let page = req.params.page ? Number(req.params.page) : undefined;
		const result = await Product.findAll(page);
		let products = result.rows;
		const total = result.count;

		let countByCategory = [];

		if (products.length > 0) {
			products = products.map((product) => {
				fillCountByCategory(product, countByCategory);
				return {
					id: product.id,
					name: product.name,
					description: product.description,
					category: product.category.name,
					price: product.price,
					detail: `http://localhost:3001/api/products/detail/${product.id}`,
					...(total > page * 10 && {
						next: `http://localhost:3001/api/products/${page + 1}`,
					}),
					...(page &&
						page > 1 && {
							prev: `http://localhost:3001/api/products/${page - 1}`,
						}),
				};
			});
			return res.json({
				count: total,
				pageTotal: Math.ceil(total / 10),
				countByCategory,
				products,
			});
		}
		return res
			.status(404)
			.json({ status: 404, message: "No se encontraron productos" });
	},
	last: async (req, res) => {
		const product = await Product.findLast();
		if (product) {
			return res.json({
				product: {
					id: product.id,
					name: product.name,
					description: product.description,
					category: product.category.name,
					image: `/images/${product.image}`,
					detail: `http://localhost:3001/api/products/detail/${product.id}`,
				},
			});
		}
		return res.status(404).json({ message: "No se encontraron productos" });
	},

	detail: async (req, res) => {
		let product = await Product.findById(req.params.id);

		if (product) {
			let formattedProduct = {
				id: product.id,
				name: product.name,
				description: product.description,
				category: product.category.name,
				image: `/images/${product.image}`,
				services: product.services.map((service) => service.name),
				amenities: product.amenities.map((amenity) => amenity.name),
			};

			res.json({ product: formattedProduct });
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	},
	delete: (req, res) => {
		Product.delete(req.params.id)
			.then(
				res
					.status(204)
					.json({ message: "El producto fue eliminado correctamente" }),
			)
			.catch((err) => {
				res.status(500).json({ message: "Error al eliminar el producto" });
			});
	},
};
function fillCountByCategory(product, countByCategory) {
	if (countByCategory.length === 0) {
		countByCategory.push({
			category: product.category.name,
			count: 1,
		});
	} else {
		let found = false;
		countByCategory.forEach((category) => {
			if (category.category === product.category.name) {
				category.count++;
				found = true;
			}
		});

		if (!found) {
			countByCategory.push({
				category: product.category.name,
				count: 1,
			});
		}
	}
}
module.exports = productController;
