import { CreatePostBodyParams, PatchPostBodyParams } from '../types/PostTypes';
import { Response, Request, NextFunction } from 'express';
import { validate } from 'class-validator';


// Валидация принимаемых данных от клиента на эндпоинт post.create
export const validatePostCreateRequestBody = async (req: Request, res: Response, next: NextFunction) => {
  const body = new CreatePostBodyParams();
  Object.assign(body, req.body);

  const errors = await validate(body); // валидируем данные по классу данных

  if (errors.length > 0) {
    return res.status(400).json(errors);
  } else {
    next();
  }
}

// Валидация принимаемых данных от клиента на эндпоинт post.patch
export const validatePostPatchRequestBody = async (req: Request, res: Response, next: NextFunction) => {
  const body = new PatchPostBodyParams();
  Object.assign(body, req.body);

  const errors = await validate(body); // валидируем данные по классу данных

  if (errors.length > 0) {
    return res.status(400).json(errors);
  } else {
    next();
  }
}