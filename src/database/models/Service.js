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
	};
	let config = {
		timestamps: false,
		tableName: "services",
	};
	const Service = sequelize.define("Service", cols, config);
	return Service;
};
