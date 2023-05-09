import { Body, Post, Route, Tags } from "tsoa";
import { ILoginParams, IRegistrationParams } from '../types/AuthTypes';
import UserService, { IUserResponse } from '../services/UserService';
import AuthService, { LoginResponse } from '../services/AuthService';


@Route("/api/auth")
@Tags("auth")
export default class AuthController {

  @Post("/login")
  public async login(
    @Body() requestBody: ILoginParams
  ) {
      const user_auth: LoginResponse = await new AuthService().login(requestBody.username, requestBody.password);

      return user_auth;
    }

  @Post("/registration")
  public async registration(
    @Body() requestBody: IRegistrationParams
  ) {
      const user: IUserResponse = await new UserService().createUser(requestBody.username, requestBody.password)
      
      if (user.hasOwnProperty('error')) {
        return user;
      }
      else {
        const token: LoginResponse = (await new AuthService().login(user.username, user.password))
        
        if (token.hasOwnProperty('error')) {
          return user;
        } else {
          return token.token;
        }
      }
    }
}