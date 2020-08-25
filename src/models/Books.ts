import { Model, DataTypes } from 'sequelize';
import { database } from '../database';

export default class Book extends Model { }

Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255)
      },
      author: {
        type: DataTypes.STRING(255)
      },
      IBSN: {
        type: DataTypes.STRING(255)
      },
      category: {
        type: DataTypes.STRING(255)
      },
      branch_of_library: {
        type: DataTypes.INTEGER
      },
      media_id: {
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'books',
      sequelize: database // this bit is important
    }
);