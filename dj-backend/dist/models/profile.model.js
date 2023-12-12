"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.model.ts
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
class Profile extends sequelize_1.Model {
}
Profile.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
});
exports.default = Profile;
