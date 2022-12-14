import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./users/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { Post } from "./posts/posts.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";


@Module( {
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),

    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {

}