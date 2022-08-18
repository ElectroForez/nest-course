import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { User } from "./users.model";



@Table( {tableName: "user_roles", createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

  @ApiProperty({description: "Уникальный идентификатор", example: 1})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(()=> User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @ForeignKey(()=> Role)
  @Column( {type: DataType.INTEGER})
  roleId: number;
}