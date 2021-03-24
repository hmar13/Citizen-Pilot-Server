import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';
import { News as NewsEntity } from './news.entity';
import { NewsDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll() {
    // get all projects in the db
    return await this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<NewsEntity> {
    // find the post with this id
    const news = await this.newsService.findOne(id);

    // if the project doesn't exist in the db, throw a 404 error
    if (!news) {
      throw new NotFoundException('This project doesn\'t exist')
    }

    return news;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() news: NewsDto, @Request() req): Promise<NewsEntity> {
    
    // create a new project and return the newly created project
    return await this. newsService.create(news, req.user.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() news: NewsDto, @Request() req): Promise<NewsEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedNews } = await this.newsService.update(id, news, req.user.id);

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This Post doesn\'t exist');
    }

    // return the updated post
    return updatedNews;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.newsService.delete(id, req.employee.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
        throw new NotFoundException('This Project doesn\'t exist');
    }

    // return success message
    return 'Successfully deleted';
  }
}
