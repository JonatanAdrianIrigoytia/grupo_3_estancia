module.exports = (sequelize, dataTypes) => {
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
		icon: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
	};
	let config = {
		timestamps: false,
		tableName: "amenities",
	};
	const Amenity = sequelize.define("Amenity", cols, config);
	return Amenity;
};
