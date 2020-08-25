import { Model, DataTypes } from 'sequelize';
import { database } from '../database';

export default class Media extends Model {}

Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING(2048)
      }
    },
    {
      tableName: 'media',
      sequelize: database // this bit is important
    }
);