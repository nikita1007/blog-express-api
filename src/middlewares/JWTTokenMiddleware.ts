import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import TokenHelper from '../helpers/TokenHelper';


/**
 * Middleware проверяющий валидность JWT токена
 */
export const validateJWTTokenIfExistsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [type, token] = new TokenHelper().getHeaderTypeAndToken(authHeader);
    
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Invalid authorization format' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.APP_SECRET_KEY);
      const reqUser = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  } else {
    next();
  }

} 