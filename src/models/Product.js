const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const Op = require("sequelize").Op;
const productIncludes = [
	{ model: db.Category, as: "category" },
	{
		model: db.Amenity,
		as: "amenities",
	},
	{
		model: db.Service,
		as: "services",
	},
];
const Product = {
	findAll: async function () {
		return await db.Product.findAll({
			include: productIncludes,
		});
	},
	findById: async function (id) {
		return await db.Product.findByPk(id, {
			include: productIncludes,
		});
	},
	findByField: async function (field, value) {
		return await db.Product.findOne({
			include: productIncludes,
			where: { [field]: value },
		});
	},
	findByCategory: async function (categoryName) {
		return await db.Product.findAll({
			include: [
				{ model: db.Category, as: "category", where: { name: categoryName } },
				{
					model: db.Amenity,
					as: "amenities",
					required: false,
				},
				{
					model: db.Service,
					as: "services",
					required: false,
				},
			],
		});
	},
	search: async function (search) {
		return await db.Product.findAll({
			include: productIncludes,
			where: {
				[Op.or]: [
					{ name: { [Op.like]: `%${search}%` } },
					{ description: { [Op.like]: `%${search}%` } },
				],
			},
		});
	},
	create: async function (productData, filename) {
		let product = this.fillProductData(productData, filename);
		try {
			let createdProduct = await db.Product.create(product, {
				include: productIncludes,
			});
			if (productData.services) {
				let services = Array.isArray(productData.services)
					? productData.services
					: [productData.services];
				createdProduct.setServices(services);
			}
		} catch (error) {
			return console.log(error);
		}
	},
	edit: async function (id, productData, filename) {
		let currentData = await this.findById(id);
		let product = this.fillProductData(productData, filename, currentData);
		try {
			await db.Product.update(product, {
				where: { id: id },
				include: productIncludes,
			});

			if (productData.services) {
				let services = Array.isArray(productData.services)
					? productData.services
					: [productData.services];
				//Necesito volver a buscar el producto que edite para resetearle los servicios
				//TODO: CONSULTAR SI HAY UNA MEJOR FORMA DE HACERLO, probé recibiendo el resultado del update pero no funcionó
				db.Product.findByPk(id).then((product) => {
					product.setServices(services);
				});
			}
		} catch (error) {
			return console.log(error);
		}
	},
	delete: async function (id) {
		this.findById(id).then((product) => {
			fs.unlinkSync(
				path.join(__dirname, `../../public/images/${product.image}`),
			);
		});

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
			name: productData.name,
			description: productData.description,
			categoryId: productData.category,
			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			longDescription: longDescription,

			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			price: productData.price
				? parseFloat(productData.price)
				: currentData.price,

			// Valida si llego un valor para el descuento, si no llego lo pone en 0
			discount: productData.discount ? parseInt(productData.discount) : 0,
		};

		if (productData.category.name == "room") {
			// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
			product.capacity = productData.capacity
				? parseInt(productData.capacity)
				: currentData && currentData.capacity
				? parseInt(currentData.capacity)
				: 0;
		}
		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
		else
			product.duration = productData.duration
				? parseInt(productData.duration)
				: currentData && currentData.duration
				? parseInt(currentData.duration)
				: 0;

		// Valida si me llegaron datos del formulario, si llegaron pone esos sino deja los actuales del producto
		if (currentData && currentData.image && !filename)
			product.image = currentData.image;
		else product.image = this.getFilePath(productData.category, filename);

		return product;
	},
	//Genera el nombre de la imagen dependiendo si es una habitacion o una actividad
	getFilePath: function (category, filename) {
		if (filename) {
			//category == 1 'room'
			if (category == 1) return "products/rooms/" + filename;
			return "products/activities/" + filename;
		}
		return "default-image.png";
	},
	getAvailableServices: async function () {
		return await db.Service.findAll();
	},
	getCategories: async function () {
		return await db.Category.findAll();
	},
};

module.exports = Product;
