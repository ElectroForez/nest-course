import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAutGuard } from "../auth/jwt-aut.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }

  @ApiOperation({summary: "Создание нового пользователя"})
  @ApiResponse({status: HttpStatus.CREATED, type: User})
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({summary: "Возвращает всех пользователей"})
  @ApiResponse({status: HttpStatus.OK, type: [User]})
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAutGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: "Добавляет роль пользователю"})
  @ApiResponse({status: HttpStatus.OK, type: [User]})
  @ApiResponse({status: HttpStatus.NOT_FOUND, type: Object})
  @HttpCode(HttpStatus.OK)
  @Post('/role')
  @UseGuards(JwtAutGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({summary: "Банит пользователя"})
  @ApiResponse({status: HttpStatus.OK, type: [User]})
  @ApiResponse({status: HttpStatus.NOT_FOUND, type: Object})
  @HttpCode(HttpStatus.OK)
  @Post('/ban')
  @UseGuards(JwtAutGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
