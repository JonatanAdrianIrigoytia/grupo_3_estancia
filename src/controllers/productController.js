const fs = require("fs");
const path = require("path");
const { title } = require("process");

const productController = {
	list: (req, res) => {
		res.render("productsList", { productsList: getProducts() });
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

const getProducts = () => {
	let products = JSON.parse(
		fs.readFileSync(
			path.resolve(__dirname, "../data/products.json"),
			"utf-8",
		) || [],
	);
	return products.sort((product1, product2) => product1 - product2);
};

const getProduct = (productId) => {
	return getProducts().find((product) => product.id == productId);
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
