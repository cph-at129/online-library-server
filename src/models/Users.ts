import { Model, DataTypes } from 'sequelize';
import { database } from '../database';

export default class User extends Model { }

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(255)
      },
      name: {
        type: DataTypes.STRING(255)
      },
      address: {
        type: DataTypes.STRING(255)
      },
      phone: {
        type: DataTypes.STRING(255)
      },
      reader_number: {
        type: DataTypes.STRING(255)
      },
      reader_number_date: {
        type: DataTypes.DATE
      },
      branch_of_library: {
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING(255)
      },
      password: {
        type: DataTypes.STRING(255)
      },
      role: {
        type: DataTypes.INTEGER
      },
      approved: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'users',
      sequelize: database // this bit is important
    }
);