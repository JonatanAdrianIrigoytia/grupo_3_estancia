const fs = require("fs");
const path = require("path");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const rooms = products.filter((product) => product.category == "room");
const activities = products.filter((product) => product.category == "activity");
const mainController = {
	home: (req, res) => {
		res.render("index", { rooms, activities });
	},
};

module.exports = mainController;
