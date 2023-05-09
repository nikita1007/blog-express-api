import { DataTypes, Sequelize } from 'sequelize';
import { BaseModelAttributes } from '../db/types/BaseTypes';


export const baseModelAttributes: BaseModelAttributes = {
  id: {
    type: DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE(),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE(),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
};