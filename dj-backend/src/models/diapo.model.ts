// src/models/user.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '../index';

class Diapo extends Model {
  public imageURL!: string;
  public projectName!: string;
  public index!: number;
}

Diapo.init(
  {
    imageURL: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Diapo',
    tableName: 'diapos',
  }
);

export default Diapo;
