import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsEqualTo } from "./decorators/IsEqualTo.decorator";


export interface ILoginParams {
  username: string;
  password: string;
}

export class LoginBodyParams implements ILoginParams {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9_\-.@]{3,255}$/)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_\-%&*$#@!.?]{8,}$/)
  password: string;
}

export interface IRegistrationParams {
  username: string;
  password: string;
  confirm_password: string;
}

export class RegistrationBodyParams implements IRegistrationParams {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9_\-.@]{3,255}$/)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_\-%&*$#@!.?]{8,}$/, {message: "Значение поля `confirm_password` должно содержать более 8 символов, и может содержать латинские буквы, цырфы и спецсимволы"})
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_\-%&*$#@!.?]{8,}$/, {message: "Значение поля `confirm_password` должно содержать более 8 символов, и может содержать латинские буквы, цырфы и спецсимволы"})
  @IsEqualTo('password', {message: "Значение поля `confirm_password` не идентично значению поля `password`"})
  confirm_password: string;
}
