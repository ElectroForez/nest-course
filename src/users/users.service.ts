import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { NotFoundError } from "rxjs";


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private rolesService: RolesService) {

  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue("ADMIN");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;

  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('roles', role);
      return dto;
    }
    throw new NotFoundError('Роль или пользователь не найдены');

  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
