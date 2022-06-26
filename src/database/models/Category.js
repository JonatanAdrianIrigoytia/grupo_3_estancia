module.exports = (sequelize, dataTypes) => {
	let alias = "Category";
	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
	};
	let config = {
		timestamps: false,
		tableName: "categories",
	};
	const Category = sequelize.define(alias, cols, config);
	Category.associate = function (models) {
		Category.hasMany(models.Product, {
			as: "products",
			foreignKey: "categoryId",
		});
	};
	return Category;
};
