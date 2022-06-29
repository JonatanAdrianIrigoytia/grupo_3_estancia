module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        roleId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    const config = {
        timestamps: false,
        tableName: "users"
    };
    const User = sequelize.define(alias, cols, config);
    User.associate = function (models) {
        User.belongsTo(models.Role, {
            as: "role",
            foreignKey: "roleId"
        });
    }

    return User;
}