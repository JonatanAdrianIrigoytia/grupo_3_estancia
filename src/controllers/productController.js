const fs = require("fs");

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
		res.render("productsList", { productsList: getProducts() });
	},
};

const getProducts = () => {
	let products = JSON.parse(
		fs.readFileSync(
			path.resolve(__dirname, "../database/products.json"),
			"utf-8",
		),
	);
	return products;
};

const getProduct = (productId) => {
	return getProducts.find((product) => product.id == productId);
};
module.exports = productController;
