"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.model.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
});
class User extends sequelize_1.Model {
}
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});
exports.default = User;
