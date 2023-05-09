import Auth, { AuthAttributes } from '../models/AuthModel';
import User, { UserAttributes } from '../models/UserModel';
import AuthHelper from '../helpers/AuthHelper';
import TokenHelper from '../helpers/TokenHelper';
import UserService from './UserService';


type checkAuthCredentials = {username?: UserAttributes["username"], password?: UserAttributes["password"], token?: AuthAttributes['jwt_key']};

export interface IAuthCheckAuthorizationResponse {
  id?: number;
  token?: string | any;
}

interface LoginErrorResponse {
  error?: {
    code: 401,
    message?: string;
  }
}

export interface LoginResponse extends LoginErrorResponse {
  token?: string
};


interface IAuthService {
  checkAuthorization(data: checkAuthCredentials): Promise<IAuthCheckAuthorizationResponse>;
  login(username: UserAttributes["username"], password: UserAttributes["password"]): Promise<LoginResponse>;
}

export default class AuthService implements IAuthService {

  /**
   * 
   * Метод проверяющий авторизацию токена пользователя
   * 
   * @param data - {token: string} | {username: string, password: string}
   * @returns True - Если пользователь авторизирован
   * @returns False - Если пользователь не авторизирован
   */
  public async checkAuthorization(data: checkAuthCredentials): Promise<IAuthCheckAuthorizationResponse | undefined> {   
    if (data.token) {   
      const user = await Auth.findOne({
        attributes: ["id"],
        where: {
          jwt_key: data.token
        }
      });

      if (user && user.id) {
        return {token: user.id};
      } else {
        return undefined;
      }
  
    } else if (data.username && data.password) {

      const user = await Auth.findOne({
        attributes: ["jwt_key"],
        where: {
          user_id: (await User.findOne({
            attributes: ["id"],
            where: {
              username: data.username,
              password: new AuthHelper().hash(data.password),
            }
          })).id
        },
        order: [['createdAt', 'DESC']]
      });

      if (user && user.jwt_key) {
        return {token: user.jwt_key};
      } else {
        return undefined;
      }
  
    }
  }

  /**
   * 
   * Метод авторизирующий пользователя
   * 
   * @param username - username пользователя типа string
   * @param password - пароль пользователя типа string
   * @returns AuthModel.jwt_key
   * @returns Error Code 401 - Unauthorized. Не удалось авторизовать пользователя
   */
  public async login(username: UserAttributes["username"], password: UserAttributes["password"]): Promise<LoginResponse | any> {
    const token = (await this.checkAuthorization({username: username, password: password})); 
    
    if (token && token.token) {
      return {token: token.token};
    }

    if (!new UserService().checkUserExists(username)) {
      return {error: {code: 401, message: "Такого пользователя не существует"}};
    } else {

      const user_id = (await User.findOne({
        attributes: ['id'],
        where: {
          username: username,
          password: new AuthHelper().hash(password)
        },
      })).id;

      if (!user_id) {
        return {error: {code: 401, message: "Данные для авторизации введены неверно"}}
      } else {
        const token = new TokenHelper().generateJWTToken({user_nickname: username}, {});

        await Auth.create({
          user_id: user_id,
          jwt_key: token,
        })

        return {token: token};
      }
    }

  }
}