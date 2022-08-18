import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAutGuard } from "../auth/jwt-aut.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }

  @ApiOperation({summary: "Создание нового пользователя"})
  @ApiResponse({status: HttpStatus.CREATED, type: User})
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({summary: "Возвращает всех пользователей"})
  @ApiResponse({status: HttpStatus.OK, type: [User]})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, type: Object})
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAutGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAll() {
    return this.userService.getAllUsers();
  }



}
