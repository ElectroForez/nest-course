import { Injectable } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./posts.model";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private filesService: FilesService) {

  }

  async create(dto: CreatePostDto, image: string) {
    const fileName = await this.filesService.createFile(image);
    const post = this.postRepository.create({...dto, image: fileName});
    return post;

  }
}
