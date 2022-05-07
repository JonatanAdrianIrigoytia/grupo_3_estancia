const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productController = {
	list: (req, res) => {
		res.render("productsList", { products });
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
		res.render("productCart", { cart: cart });
	},
	create: (req, res) => {
		res.render("productCreate");
	},
	edit: (req, res) => {
		res.render("productEdit", { product: getProduct(req.params.id) });
	},
	//El save deberia crear o actualizar el producto en la base de datos
	save: (req, res) => {
		if (req.params.id) edit(req.params.id, req.body);
		else create(req.body);
		res.redirect("/products");
	},
};
const getProduct = (productId) => {
	return products.find((product) => product.id == productId);
};

function edit(id, data) {
	let editedProduct = fillProductData(id, data);
	let products = getProducts();
	let index = products.findIndex((product) => product.id == id);
	products[index] = editedProduct;
	fs.writeFileSync("../data/products.json", JSON.stringify(products));
}
function create(data) {
	let products = getProducts();
	let id = 1;
	if (products.length > 0) id = products[products.length - 1].id + 1;
	let product = fillProductData(id, data);
	products.push(product);
	fs.writeFileSync("../data/products.json", JSON.stringify(products));
}

function fillProductData(id, data) {
	return {
		id: id,
		title: data.title,
		category: data.category,
		description: data.description,
		services: data.services,
		image: data.image,
	};
}

module.exports = productController;
