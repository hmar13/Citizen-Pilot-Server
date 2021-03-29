import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';
import { News as NewsEntity } from './news.entity';
import { NewsDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll() {
    return await this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<NewsEntity> {
    const news = await this.newsService.findOne(id);

    if (!news) {
      throw new NotFoundException("This project doesn't exist");
    }

    return news;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() news: NewsDto, @Request() req): Promise<NewsEntity> {
    return await this.newsService.create(news, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() news: NewsDto,
    @Request() req,
  ): Promise<NewsEntity> {
    const { numberOfAffectedRows, updatedNews } = await this.newsService.update(
      id,
      news,
      req.user.id,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return updatedNews;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.newsService.delete(id, req.employee.id);

    if (deleted === 0) {
      throw new NotFoundException("This Project doesn't exist");
    }

    return 'Successfully deleted';
  }
}
