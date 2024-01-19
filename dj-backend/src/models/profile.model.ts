// src/models/user.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '../index';

class Profile extends Model {

  public username!: string;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public country!: string;
  public avatarURL!: string;
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
        allowNull: true,
      },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatarURL: {
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