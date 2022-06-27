const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const Product = require("../models/Product");
/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
// const productsFilePath = path.join(__dirname, "../data/products.json");
// const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

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
		if (req.params.id)
			await Product.edit(
				req.params.id,
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
};

module.exports = productController;
