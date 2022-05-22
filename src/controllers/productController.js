const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productController = {
	list: (req, res) => {
		res.render("productsList", { products, title: "Nuestros productos" });
	},
	listRooms: (req, res) => {
		let rooms = Product.findByCategory("room");
		res.render("productsList", {
			title: "Todas las habitaciones",
			products: rooms,
		});
	},
	listActivities: (req, res) => {
		let activities = Product.findByCategory("activity");
		res.render("productsList", {
			title: "Todas las actividades",
			products: activities,
		});
	},
	detail: (req, res) => {
		res.render("productDetail", { product: Product.findByID(req.params.id) });
	},
	cart: (req, res) => {
		let cart = Product.findAll().slice(0, 3);
		res.render("productCart", { products: cart });
	},
	create: (req, res) => {
		res.render("productCreate", {
			availableServicies: Product.getAvailableServices(),
		});
	},
	edit: (req, res) => {
		res.render("productEdit", { product: Product.findByID(req.params.id) });
	},

	save: (req, res) => {
		if (req.params.id)
			Product.edit(
				req.params.id,
				req.body,
				req.file ? req.file.filename : undefined,
			);
		else Product.create(req.body, req.file ? req.file.filename : undefined);
		res.redirect("/products");
	},

	delete: (req, res) => {
		Product.delete(req.params.id);
		res.redirect("/products");
	},

	buy: (req, res) => {
		res.send("Reserva recibida");
	},
};

module.exports = productController;
