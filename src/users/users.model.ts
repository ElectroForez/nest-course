import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "./user-roles.model";
import { Role } from "../roles/roles.model";
import { Post } from "../posts/posts.model";


interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table( {tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({description: "Уникальный идентификатор", example: 1})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({description: "Эл. почта", example: "user@mail.ru"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({description: "Пароль", example: "abasa123"})
  @Column( {type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({description: "Забанен ли чувак", example: true})
  @Column( {type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({description: "Причина бана", example: "молчать либерал"})
  @Column( {type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}