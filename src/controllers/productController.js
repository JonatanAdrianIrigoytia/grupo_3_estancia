const fs = require("fs");
const path = require("path");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productController = {
	list: (req, res) => {
		res.render("productsList", { products, title: "Nuestros productos" });
	},
	listRooms: (req, res) => {
		let rooms = products.filter((product) => product.category == "room");
		res.render("productsList", {
			title: "Todas las habitaciones",
			products: rooms,
		});
	},
	listActivities: (req, res) => {
		let activities = products.filter(
			(product) => product.category == "activity",
		);
		res.render("productsList", {
			title: "Todas las actividades",
			products: activities,
		});
	},
	detail: (req, res) => {
		res.render("productDetail", { product: getProduct(req.params.id) });
	},
	cart: (req, res) => {
		let cart = products.slice(0, 3);
		res.render("productCart", { products: cart });
	},
	create: (req, res) => {
		res.render("productCreate");
	},
	edit: (req, res) => {
		res.render("productEdit", { product: getProduct(req.params.id) });
	},

	save: (req, res) => {
		if (req.params.id) edit(req.params.id, req);
		else create(req);
		res.redirect("/products");
	},

	delete: (req, res) => {
		let productIndex = products.findIndex(
			(product) => product.id == req.params.id,
		);
		products.splice(productIndex, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		res.redirect("/products");
	},

	buy: (req, res) => {
		res.send("Reserva recibida");
	},
};
const getProduct = (productId) => {
	return products.find((product) => product.id == productId);
};

function edit(id, req) {
	let editedProduct = fillProductData(id, req);
	let index = products.findIndex((product) => product.id == id);
	products[index] = editedProduct;
	fs.writeFileSync(productsFilePath, JSON.stringify(products));
}
function create(req) {
	let id = 1;
	if (products.length > 0) id = products[products.length - 1].id + 1;
	let product = fillProductData(id, req);
	products.push(product);
	fs.writeFileSync(productsFilePath, JSON.stringify(products));
}

function fillProductData(id, req) {
	let product = {
		id: id,
		...req.body,
		image: getFile(req.body.category, req.file),
	};
	product.discount = req.body.discount || 0;
	if (req.body.category == "room") {
		product.capacity = req.body.capacity || 0;
		product.services = req.body.services ? [req.body.services] : [];
	} else product.duration = req.body.duration;

	return product;
}

function getFile(category, file) {
	if (file) {
		if (category == "room") return "/products/rooms/" + file.filename;
		return "/products/activities/" + file.filename;
	}
	return "default-image.png";
}

module.exports = productController;
