/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsNotEmpty } from "@nestjs/class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  tier: number;
}
