import { Model, DataTypes } from 'sequelize';
import { BaseAttributes } from '../db/types/BaseTypes';
import { baseModelAttributes } from './BaseModel';
import database from '../db/database';
import User from './UserModel';


export interface AuthAttributes extends BaseAttributes{
  user_id: number;
  jwt_key: string;
  is_banned?: boolean;
}

class Auth extends Model<AuthAttributes> implements AuthAttributes {
  public id!: number;
  public user_id!: number;
  public jwt_key!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Auth.init(
  {
    ...baseModelAttributes,
    user_id: {
      type: DataTypes.INTEGER(),
      unique: true,
      references: {
        model: User,
        key: "id",
      }
    },
    jwt_key: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: 'auth',
    sequelize: database
  }
);

export default Auth;