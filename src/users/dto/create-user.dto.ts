import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsUppercase, isUppercase, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: "test@test.com", description: "Эл. почта"})
  @IsString({message: "Должно быть строкой"})
  @IsEmail({}, {message: "Некорректный email"})

  readonly email: string;

  @ApiProperty({example: "QWe123", description: "Пароль"})
  @IsString({message: "Должно быть строкой"})
  @Length(4, 16, {message: "Допустимая длина от 4 до 16 символов"})
  readonly password: string;
}