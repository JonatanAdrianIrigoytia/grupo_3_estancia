// const path = require("path");
// const fs = require("fs");
const db = require("../database/models");
const Product = {
	findAll: async function () {
		return await db.Product.findAll();
	},
	findById: async function (id) {
		return await db.Product.findByPk(id);
	},
	findByField: async function (field, value) {
		return await db.Product.findOne({
			where: { [field]: value },
		});
	},
	findByCategory: async function (categoryName) {
		return await db.Product.findAll({
			include: [{ model: db.Category, where: { name: categoryName } }],
		});
	},
	create: async function (productData, filename) {
		let product = this.fillProductData(productData, filename);
		return await db.Product.create(product);
	},
	edit: async function (id, productData, filename) {
		let currentData = await db.Product.findByPk(id);
		let product = this.fillProductData(productData, filename, currentData);
		return await db.Product.update(product, { where: { id: productData.id } });
	},
	delete: async function (id) {
		return await db.Product.destroy({ where: { id: id } });
	},
	fillProductData: function (productData, filename, currentData = undefined) {
		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
		let longDescription = "";
		if (currentData && !productData.longDescription)
			longDescription = currentData.longDescription;
		else if (productData.longDescription)
			longDescription = productData.longDescription;

		let product = {
			id: id,
			name: productData.name,
			description: productData.description,
			category: productData.category,
			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			longDescription: longDescription,

			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			price: productData.price
				? parseFloat(productData.price)
				: currentData.price,

			// Valida si llego un valor para el descuento, si no llego lo pone en 0
			discount: productData.discount ? parseInt(productData.discount) : 0,
		};

		if (productData.category == 1) {
			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			product.capacity = productData.capacity
				? parseInt(productData.capacity)
				: currentData.capacity || 0;

			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			// if (productData.services)
			// 	product.services = Array.isArray(productData.services)
			// 		? productData.services
			// 		: [productData.services];
			// else if (currentData && currentData.services)
			// 	product.services = currentData.services;
			// else product.services = [];

			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			// if (productData.amenities) product.amenities = [productData.amenities];
			// else if (currentData && currentData.amenities)
			// 	product.amenities = currentData.amenities;
			// else product.amenities = [];
		}
		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
		else
			product.duration = productData.duration
				? parseInt(productData.duration)
				: currentData.duration || 0;

		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
		if (currentData && currentData.image && !filename)
			product.image = currentData.image;
		else product.image = this.getFilePath(productData.category, filename);

		return product;
	},
	//Genera el nombre de la imagen dependiendo si es una habitacion o una actividad
	getFilePath: function (category, filename) {
		if (filename) {
			if (category == 1) return "/products/rooms/" + filename;
			return "/products/activities/" + filename;
		}
		return "default-image.png";
	},
	getAvailableServices: async function () {
		let services = await db.Service.findAll();
		return services;
	},
	getCategories: async function () {
		let categories = await db.Category.findAll();
		return categories;
	},
	// filepath: path.resolve(__dirname, "../data/products.json"),

	// getData: function () {
	// 	return JSON.parse(fs.readFileSync(this.filepath, "utf-8"));
	// },

	// findAll: function () {
	// 	return this.getData();
	// },

	// generateID: function (products = undefined) {
	// 	/* Por temas de performance agregue que los metodos que necesitan el listado de productos puedan recibirlo
	// 	Como parametro ya que si la funcion que los llama tiene el listado actualizado, se lo puede pasar
	// 	a la funcion subsiguiente y esta no necesita perder el tiempo en ir a buscar los datos */
	// 	if (!products) products = this.findAll();
	// 	let id = 1;
	// 	if (products.length > 0) id = products[products.length - 1].id + 1; //products.at(-1).id soportado a patir de Node.js 16.6.0
	// 	return id;
	// },

	// findByID: function (id) {
	// 	return this.findAll().find((product) => product.id == id);
	// },

	// findByField: function (field, value) {
	// 	let products = this.findAll();
	// 	return products.find((product) => product[field] == value);
	// },

	// findIndexByID: function (id, products = undefined) {
	// 	/* Por temas de performance agregue que los metodos que necesitan el listado de productos puedan recibirlo
	// 	Como parametro ya que si la funcion que los llama tiene el listado actualizado, se lo puede pasar
	// 	a la funcion subsiguiente y esta no necesita perder el tiempo en ir a buscar los datos */
	// 	if (!products) products = this.findAll();
	// 	let productIndex = products.findIndex((product) => product.id == id);
	// 	return productIndex;
	// },

	// findByCategory: function (category) {
	// 	return this.findAll().filter((product) => product.category == category);
	// },

	// create: function (productData, filename) {
	// 	let products = this.findAll();
	// 	/* Por temas de performance agregue que los metodos que necesitan el listado de productos puedan recibirlo
	// 	Como parametro ya que si la funcion que los llama tiene el listado actualizado, se lo puede pasar
	// 	a la funcion subsiguiente y esta no necesita perder el tiempo en ir a buscar los datos */
	// 	let id = this.generateID(products);
	// 	let product = this.fillProductData(id, productData, filename);
	// 	products.push(product);
	// 	fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	// },

	// edit: function (id, productData, filename) {
	// 	let products = this.findAll();
	// 	/* Por temas de performance agregue que los metodos que necesitan el listado de productos puedan recibirlo
	// 	Como parametro ya que si la funcion que los llama tiene el listado actualizado, se lo puede pasar
	// 	a la funcion subsiguiente y esta no necesita perder el tiempo en ir a buscar los datos */
	// 	let index = this.findIndexByID(id, products);
	// 	let currentData = products[index];
	// 	let editedProduct = this.fillProductData(
	// 		id,
	// 		productData,
	// 		filename,
	// 		currentData,
	// 	);
	// 	products[index] = editedProduct;
	// 	fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	// },

	// delete: function (id) {
	// 	let products = this.findAll();
	// 	let index = this.findIndexByID(id, products);
	// 	products.splice(index, 1);
	// 	fs.writeFileSync(this.filepath, JSON.stringify(products, null, " "));
	// },

	// fillProductData: function (
	// 	id,
	// 	productData,
	// 	filename,
	// 	currentData = undefined,
	// ) {
	// 	// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 	let longDescription = "";
	// 	if (currentData && !productData.longDescription)
	// 		longDescription = currentData.longDescription;
	// 	else if (productData.longDescription)
	// 		longDescription = productData.longDescription;

	// 	let product = {
	// 		id: id,
	// 		name: productData.name,
	// 		description: productData.description,
	// 		category: productData.category,
	// 		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 		longDescription: longDescription,

	// 		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 		price: productData.price
	// 			? parseFloat(productData.price)
	// 			: currentData.price,

	// 		// Valida si llego un valor para el descuento, si no llego lo pone en 0
	// 		discount: productData.discount ? parseInt(productData.discount) : 0,
	// 	};

	// 	if (productData.category == "room") {
	// 		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 		product.capacity = productData.capacity
	// 			? parseInt(productData.capacity)
	// 			: currentData.capacity || 0;

	// 		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 		if (productData.services)
	// 			product.services = Array.isArray(productData.services)
	// 				? productData.services
	// 				: [productData.services];
	// 		else if (currentData && currentData.services)
	// 			product.services = currentData.services;
	// 		else product.services = [];

	// 		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 		if (productData.amenities) product.amenities = [productData.amenities];
	// 		else if (currentData && currentData.amenities)
	// 			product.amenities = currentData.amenities;
	// 		else product.amenities = [];
	// 	}
	// 	// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 	else
	// 		product.duration = productData.duration
	// 			? parseInt(productData.duration)
	// 			: currentData.duration || 0;

	// 	// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
	// 	if (currentData && currentData.image && !filename)
	// 		product.image = currentData.image;
	// 	else product.image = this.getFilePath(productData.category, filename);

	// 	return product;
	// },
};

module.exports = Product;
