import User, { UserAttributes } from '../models/UserModel';
import crypto from "crypto";


export interface IUserCreateResponseSuccess {
  username?: string;
  password?: string;
}

export interface IUserCreateResponseError {
  error?: {
    code: 409;
    message?: string
  }
}

export interface IUserResponse extends IUserCreateResponseSuccess, IUserCreateResponseError {}

interface IUserService {
  checkUserExists(username: UserAttributes['username']): Promise<Boolean>;
  createUser(username: UserAttributes['username'], password: UserAttributes['password']): Promise<IUserResponse>;
}

export default class UserService implements IUserService {
  /**
   * 
   * @param username 
   * @returns True - Если пользователь уже существует в БД
   * @returns False - Если пользователь не существует в БД
   */
  public async checkUserExists(username: UserAttributes['username']): Promise<Boolean> {
    const user = await User.findOne({
      attributes: ['id'],
      where: {
        username: username,
      }
    });

    return Boolean(user);
  }

  /**
   * 
   * @param username 
   * @param password 
   * @returns UserModel.username
   * @returns Error Code 409 - Conflict. Означает, что пользователь в БД уже существует.
   */
  public async createUser(username: UserAttributes['username'], password: UserAttributes['password']): Promise<IUserResponse> {
    if (await this.checkUserExists(username))
      return {
        error: {
          code: 409,
          message: "Такой пользователь уже существует",
        }
      }
    const user = await User.create({username: username, password: crypto.createHash("sha256").digest("base64")})    

    return {username: username, password: password};
  }
} 