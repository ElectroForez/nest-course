import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../users/user-roles.model";
import { User } from "../users/users.model";


interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table( {tableName: "roles"})
export class Role extends Model<Role, RolesCreationAttrs> {

  @ApiProperty({description: "Уникальный идентификатор", example: 1})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({description: "Уникальное наименование роли", example: "ADMIN"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({description: "Описание роли", example: "Тут чёт про роль"})
  @Column( {type: DataType.STRING, allowNull: true})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}