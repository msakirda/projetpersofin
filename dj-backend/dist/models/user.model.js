"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.model.ts
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
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
    sequelize: index_1.sequelize,
    modelName: 'User',
    tableName: 'users',
});
exports.default = User;
