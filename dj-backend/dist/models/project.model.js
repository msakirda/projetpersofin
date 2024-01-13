"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.model.ts
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
class Project extends sequelize_1.Model {
}
Project.init({
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
    },
    imageURL: {
        type: sequelize_1.DataTypes.STRING, // Updated to use an array for multiple images
        allowNull: false,
    },
    musicUrl: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'Project',
    tableName: 'projects',
});
exports.default = Project;
