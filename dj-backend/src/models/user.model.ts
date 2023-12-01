// src/models/user.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '../index';

class User extends Model {
  public username!: string;
  public password!: string;
  public email!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
