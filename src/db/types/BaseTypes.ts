import { DataTypes } from "sequelize";
import { SequelizeMethod } from "sequelize/types/utils";


export interface BaseAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaseModelAttributes {
  id: {
    type: DataTypes.IntegerDataType;
    autoIncrement?: boolean;
    primaryKey?: boolean;
    initialValue?: number;
    defaultValue?: number;
  };
  createdAt?: {
    type: DataTypes.DateDataType,
    defaultValue: SequelizeMethod;
  }
  updatedAt?: {
    type: DataTypes.DateDataType,
    defaultValue: SequelizeMethod;
  }
}
