import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class ICreatePostBodyParams {
  title: string;
  text: string;
}

export class CreatePostBodyParams implements ICreatePostBodyParams {
  @IsNotEmpty({message: "Поле `title` не должно быть пустым"})
  @MinLength(5, {message: "Поле `title` должно имень не менее 5 символов"})
  @MaxLength(500, {message: "Поле `title` должно содержать не более 500 символов"})
  @Matches(/^\w.*$/, {message: "Поле `title` не должно начинаться с пробела"})
  title: string;

  @IsNotEmpty({message: "Поле `text` не должно быть пустым"})
  @MinLength(1, {message: "Поле `text` должно имень не менее 1 символа"})
  @Matches(/^\w.*$/, {message: "Поле `text` не должно начинаться с пробела"})
  text: string;
}

export class PatchPostBodyParams implements ICreatePostBodyParams {
  @MinLength(5, {message: "Поле `title` должно имень не менее 5 символов"})
  @MaxLength(500, {message: "Поле `title` должно содержать не более 500 символов"})
  @Matches(/^\w.*$/, {message: "Поле `title` не должно начинаться с пробела"})
  title: string;

  @MinLength(1, {message: "Поле `text` должно имень не менее 1 символа"})
  @Matches(/^\w.*$/, {message: "Поле `text` не должно начинаться с пробела"})
  text: string;
}

