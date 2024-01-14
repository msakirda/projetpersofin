// src/models/user.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';

class Project extends Model {
  public username!: string;
  public imageURL!: string; // Updated to store multiple image URLs
  public musicUrl! : string;
  public projectName! : string;
  public eachPageDuration! : number;
  public pagesNumber! : number;
}

Project.init(
  {
    projectName: {
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
      },
    username: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING, // Updated to use an array for multiple images
      allowNull: false,
    },
    musicUrl: {
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
    },
    eachPageDuration: {
      type: DataTypes.NUMBER,
      primaryKey: false,
      allowNull: false,
    },
    pagesNumber: {
      type: DataTypes.NUMBER,
      primaryKey: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
  }
);

export default Project;
