import jwt, { JwtPayload, SignOptions }from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config({path:  path.dirname(__filename) + "/../.env"})

export interface ICheckTokenErrorResponse {
  error: {
    type: "JsonWebTokenError" | "TokenExpiredError";
    message?: string;
  }
}

export default class TokenHelper {
  /**
   * 
   * Создание JWT токена
   * 
   * @param payload - данные, которые будут находится в токене
   * @param options - дополнительные опции к формированию токена
   * @returns токен формата string
   */
  public generateJWTToken(payload: JwtPayload, options: SignOptions = {}): string {
    return jwt.sign(payload, process.env.APP_SECRET_KEY, options);
  }

  /**
   * 
   * Метод проверяющий валидность JWT токена
   * 
   * @param token - токен формата string
   * @returns True - елси токен верифицирован
   * @returns JWTError - "TokenExpiredError" если время жизни токена истекло | "JsonWebTokenError" если токен не валиден
   */
  public checkJWTToken(token: string): boolean | ICheckTokenErrorResponse {
    try {
      return Boolean(jwt.verify(token, process.env.APP_SECRET_KEY));
    } catch (error) {
      if (["JsonWebTokenError", "TokenExpiredError"].indexOf(error.name) !== -1) {
        return {error: {
          type: error.name,
          message: error.message
        }}
      }
    }
  }

  /**
   * 
   * @param header - принимает строку Authorization из заголовка запроса
   * 
   * @returns res - массив строк формата [type: string, token: string]
   */ 
  public getHeaderTypeAndToken(header: string): Array<string> {
    return header.split(' ');
  }

  /**
   * 
   * @param header - принимает строку Authorization из заголовка запроса
   * @returns token - jwt токен
   */
  public getHeaderToken(header: string): string {
    return header.split(' ')[1];
  }

  /**
   * 
   * Декодирование токена
   * 
   * @param token  - токен формата string
   * @returns Декодируемый объект данных
   */
  public decodeJWT(token: string): any {
    return jwt.decode(token);
  }
}