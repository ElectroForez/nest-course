import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/users.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {

  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User с таким email уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = {id: user.id, roles: user.roles, email: user.email};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({'message':'Неверный email или пароль'});
    }

    const passwordEquals = bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({'message':'Неверный email или пароль'});
  }
}
