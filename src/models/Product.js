const path = require("path");
const fs = require("fs");
const Product = {
	filepath: path.resolve(__dirname, "../data/products.json"),
	getData: () => JSON.parse(fs.readFileSync(this.filepath, "utf-8")),
	findAll: () => this.getData(),
	generateID: (products = undefined) => {
		if (!products) products = this.findAll();
		let id = 1;
		if (products.length > 0) id = products.at(-1).id + 1;
		return id;
	},
	findByID: (id) => this.findAll().find((product) => product.id == id),
	findByField: (field, value) => {
		let products = this.findAll();
		return products.find((product) => product[field] == value);
	},
	findIndexByID: (id, products = undefined) => {
		if (!products) products = this.findAll();
		let productIndex = products.findIndex((product) => product.id == id);
		return productIndex;
	},
	create: (productData) => {
		let products = this.findAll();
		let id = this.generateID(products);
		let product = fillProductData(id, productData);
		products.push(product);
		fs.writeFileSync(this.filepath, JSON.stringify(products), null, " ");
	},
	edit: (id, productData) => {
		let editedProduct = fillProductData(id, productData);
		let products = this.findAll();
		let index = this.findIndexByID(id, products);
		products[index] = editedProduct;
		fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	},
	delete: (id) => {
		let products = this.findAll();
		let index = this.findIndexByID(id, products);
		products.splice(index, 1);
		fs.writeFileSync(this.filepath, JSON.stringify(products), null, " ");
	},
	fillProductData: (id, productData, file) => {
		let product = {
			id: id,
			...productData,
			image: this.getFile(productData.category, file),
		};
		product.discount = productData.discount || 0;
		if (productData.category == "room") {
			product.capacity = productData.capacity || 0;
			product.services = productData.services ? [productData.services] : [];
		} else product.duration = productData.duration;

		return product;
	},
	getFile: (category, file) => {
		if (file) {
			if (category == "room") return "/products/rooms/" + file.filename;
			return "/products/activities/" + file.filename;
		}
		return "default-image.png";
	},
};

module.exports = Product;
