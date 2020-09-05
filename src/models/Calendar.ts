import { Model, DataTypes } from 'sequelize';
import { database } from '../database';

export default class Calendar extends Model {}

Calendar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255)
      },
      start: {
        type: DataTypes.DATE
      },
      end: {
        type: DataTypes.DATE
      },
      branch_of_library: {
        type: DataTypes.INTEGER
      },
    },
    {
      tableName: 'calendar',
      sequelize: database // this bit is important
    }
);