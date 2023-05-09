import { DataTypes, Model } from 'sequelize';
import { baseModelAttributes } from './BaseModel';
import { BaseAttributes } from '../db/types/BaseTypes';
import database from '../db/database';


export interface UserAttributes extends BaseAttributes {
  username: string;
  password: string;
  is_banned?: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public is_banned!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    ...baseModelAttributes,
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  },
  {
    tableName: 'user',
    sequelize: database
  }
);

export default User;