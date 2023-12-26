"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.model.ts
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
class Userfiles extends sequelize_1.Model {
}
Userfiles.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'Userfiles',
    tableName: 'userfiless',
});
exports.default = Userfiles;
