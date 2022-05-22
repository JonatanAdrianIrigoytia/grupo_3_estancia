const path = require("path");
const fs = require("fs");
const Product = {
	filepath: path.resolve(__dirname, "../data/products.json"),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.filepath, "utf-8"));
	},

	findAll: function () {
		return this.getData();
	},

	generateID: function (products = undefined) {
		if (!products) products = this.findAll();
		let id = 1;
		if (products.length > 0) id = products.at(-1).id + 1;
		return id;
	},

	findByID: function (id) {
		return this.findAll().find((product) => product.id == id);
	},

	findByField: function (field, value) {
		let products = this.findAll();
		return products.find((product) => product[field] == value);
	},

	findIndexByID: function (id, products = undefined) {
		if (!products) products = this.findAll();
		let productIndex = products.findIndex((product) => product.id == id);
		return productIndex;
	},

	findByCategory: function (category) {
		return this.findAll().filter((product) => product.category == category);
	},

	create: function (productData, filename) {
		let products = this.findAll();
		let id = this.generateID(products);
		let product = fillProductData(id, productData, filename);
		products.push(product);
		fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	},

	edit: function (id, productData, filename) {
		let editedProduct = fillProductData(id, productData, filename);
		let products = this.findAll();
		let index = this.findIndexByID(id, products);
		products[index] = editedProduct;
		fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	},

	delete: function (id) {
		let products = this.findAll();
		let index = this.findIndexByID(id, products);
		products.splice(index, 1);
		fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	},

	fillProductData: function (id, productData, filename) {
		let product = {
			id: id,
			...productData,
			image: this.getFile(productData.category, filename),
		};
		product.price = parseFloat(product.price);
		product.discount = parseInt(productData.discount) || 0;

		if (productData.category == "room") {
			product.capacity = parseInt(productData.capacity) || 0;
			product.services = productData.services ? [productData.services] : [];
		} else product.duration = parseInt(productData.duration) || 0;

		return product;
	},
	//Genera el nombre de la imagen dependiendo si es una habitacion o una actividad
	getFilePath: function (category, filename) {
		if (filename) {
			if (category == "room") return "/products/rooms/" + filename;
			return "/products/activities/" + filename;
		}
		return "default-image.png";
	},
};

module.exports = Product;
