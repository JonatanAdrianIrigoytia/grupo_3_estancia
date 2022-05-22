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
		let products = this.findAll();
		let index = this.findIndexByID(id, products);
		let currentData = products[index];
		let editedProduct = this.fillProductData(
			id,
			productData,
			currentData,
			filename,
		);
		products[index] = editedProduct;
		fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	},

	delete: function (id) {
		let products = this.findAll();
		let index = this.findIndexByID(id, products);
		products.splice(index, 1);
		fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	},

	fillProductData: function (
		id,
		productData,
		currentData = undefined,
		filename,
	) {
		let product = {
			id: id,
			name: productData.name ? productData.name : currentData.name,
			description: productData.description
				? productData.description
				: currentData.description,
			longDescription: productData.longDescription
				? productData.longDescription
				: currentData.longDescription,
			category: productData.category,
			price: productData.price ? parseFloat(product.price) : currentData.price,
			discount: productData.discount ? parseInt(productData.discount) : 0,
		};

		if (productData.category == "room") {
			product.capacity = productData.capacity
				? parseInt(productData.capacity) || 0
				: currentData.capacity;

			if (productData.services) product.services = [productData.services];
			else if (currentData.services) product.services = [currentData.services];
			else product.services = [];

			if (productData.amenities) product.amenities = productData.amenities;
			else if (currentData.amenities) product.amenities = currentData.amenities;
			else product.amenities = [];
		} else
			product.duration = productData.duration
				? parseInt(productData.duration)
				: currentData.duration || 0;

		if (currentData.image && !filename) product.image = currentData.image;
		else product.image = this.getFilePath(productData.category, filename);

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
