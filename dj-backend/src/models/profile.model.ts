// src/models/user.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '../index';

class Profile extends Model {
  public username!: string;
  public password!: string;
  public email!: string;
}

Profile.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
  }
);

export default Profile;