import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {

  @ApiProperty({example: "test@test.com", description: "Эл. почта"})
  email: string;

  @ApiProperty({example: "QWe123", description: "Пароль"})
  password: string;
}