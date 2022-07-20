const fs = require("fs");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

const productController = {
	list: (req, res) => {
		Product.findAll().then((products) => {
			res.render("productsList", { products, title: "Nuestros productos" });
		});
	},
	listRooms: (req, res) => {
		Product.findByCategory("room").then((rooms) =>
			res.render("productsList", {
				title: "Todas las habitaciones",
				products: rooms,
			}),
		);
	},
	listActivities: (req, res) => {
		Product.findByCategory("activity").then((activities) =>
			res.render("productsList", {
				title: "Todas las actividades",
				products: activities,
			}),
		);
	},
	detail: (req, res) => {
		Product.findById(req.params.id).then((product) => {
			res.render("productDetail", { product });
		});
	},
	cart: async (req, res) => {
		let cart = await Product.findAll().slice(0, 3);
		res.render("productCart", { products: cart });
	},
	create: async (req, res) => {
		let categories = await Product.getCategories();
		let availableServices = await Product.getAvailableServices();
		return res.render("productCreate", {
			availableServices,
			categories,
		});
	},
	edit: async (req, res) => {
		let product = await Product.findById(req.params.id);
		let availableServices = await Product.getAvailableServices();
		let categories = await Product.getCategories();
		res.render("productEdit", {
			product,
			availableServices,
			categories,
		});
	},

	save: async (req, res) => {
		let id = req.params.id;
		let product = undefined;
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			if (req.file) fs.unlinkSync(req.file.path);
			let categories = await Product.getCategories();
			let availableServices = await Product.getAvailableServices();
			if (id) product = await Product.findById(id);
			console.log(resultValidation.mapped());
			return res.render(id ? "productEdit" : "productCreate", {
				errors: resultValidation.mapped(),
				oldData: req.body,
				availableServices,
				categories,
				product,
			});
		}
		if (id)
			await Product.edit(
				id,
				req.body,
				req.file ? req.file.filename : undefined,
			);
		else
			await Product.create(req.body, req.file ? req.file.filename : undefined);

		res.redirect("/products");
	},

	delete: (req, res) => {
		Product.delete(req.params.id).then(res.redirect("/products"));
	},

	buy: (req, res) => {
		res.send("Reserva recibida");
	},

	search: (req, res) => {
		let search = req.query.search;
		Product.search(search).then((products) => {
			res.render("productsList", {
				products,
				title: "Resultados de la búsqueda",
			});
		});
	},
};

module.exports = productController;
