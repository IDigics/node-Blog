import {
  Controller,Get,Post,Put,Delete,Param,Body,UseGuards,UseInterceptors,UploadedFile,ParseIntPipe,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { ImageService } from 'src/images/images.service';
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private imageService: ImageService,
  ) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: { title: string; content: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const postData: any = {
      title: body.title,
      content: body.content,
    };

    if (file) {
      const filename = await this.imageService.processAndSaveImage(file);
      postData.image = filename;
    }

    return this.postsService.create(postData);
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{ title: string; content: string }>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const updateData: any = { ...body };

    if (file) {
      const filename = await this.imageService.processAndSaveImage(file);
      updateData.image = filename;
    }

    return this.postsService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
