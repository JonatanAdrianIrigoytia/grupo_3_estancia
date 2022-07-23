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
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        roleId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: true
        }
    };
    const config = {
        timestamps: true,
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