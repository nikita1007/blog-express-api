import { DataTypes, Model } from 'sequelize';
import { baseModelAttributes } from './BaseModel';
import { BaseAttributes } from '../db/types/BaseTypes';
import database from '../db/database';
import User from './UserModel';


export interface PostAttributes extends BaseAttributes {
  title: string;
  text: string;
  author: number;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: number;
  public title: string;
  public text: string;
  public author: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    ...baseModelAttributes,
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    }
  },
  {
    tableName: 'post',
    sequelize: database
  }
);

export default Post;