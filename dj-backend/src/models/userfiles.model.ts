// src/models/user.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '../index';

class Userfiles extends Model {
  public username!: string;
  public avatarUrl! : string;
}

Userfiles.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Userfiles',
    tableName: 'userfiless',
  }
);

export default Userfiles;