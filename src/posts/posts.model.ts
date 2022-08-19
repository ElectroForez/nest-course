import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../users/user-roles.model";
import { User } from "../users/users.model";


interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table( {tableName: "posts"})
export class Post extends Model<Post, PostCreationAttrs> {

  @ApiProperty({description: "Уникальный идентификатор", example: 1})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({description: "Название поста", example: "Новости сегодня"})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({description: "Содержание поста", example: "Был спасён котёнок"})
  @Column( {type: DataType.STRING, allowNull: true})
  content: string;

  @ApiProperty({description: "Путь к изображению для поста", example: "images/pic1.png"})
  @Column( {type: DataType.STRING, allowNull: true})
  image: string;

  @ForeignKey(() => User)
  @Column( {type: DataType.INTEGER, allowNull: false})
  userId: number

  @BelongsTo(() => User)
  author: User;
}