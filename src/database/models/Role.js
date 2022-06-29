module.exports = (sequelize, dataTypes) => {
    let alias = "Roles";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        }
    };
    const config = {
        timestamps: false,
        tableName: "roles"
    };
    const Roles = sequelize.define(alias, cols, config);
    Roles.associate = function (models) {
        Roles.belongsTo(models.User, {
            as: "users",
            foreignKey: "id"
        });
    }

    return Roles;
}