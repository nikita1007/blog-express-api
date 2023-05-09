import { Request, Response, NextFunction } from 'express';
import { RegistrationBodyParams } from '../types/AuthTypes';
import { validate } from 'class-validator';
import TokenHelper from '../helpers/TokenHelper';
import AuthService from '../services/AuthService';

// Проверка аутентификации пользователя посредством Bearer JWT токена
export const authenticateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header not found' });
  }

  const token = new TokenHelper().getHeaderToken(authHeader);
  
  const db_auth_exist = new AuthService().checkAuthorization({token: token});

  if (!db_auth_exist) {
    return res.status(401).json({ error: 'Token unathorized' });
  }
  
  next();
};


// Валидация принимаемых данных от клиента на эндпоинт auth.registration
export const validateRegistrationRequestBody = async (req: Request, res: Response, next: NextFunction) => {
  const body = new RegistrationBodyParams();
  Object.assign(body, req.body);

  const errors = await validate(body); // валидируем данные по классу данных

  if (errors.length > 0) {
    return res.status(400).json(errors);
  } else {
    next();
  }
}