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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { Contact as ContactEntity } from './contacts.entity';
import { ContactsDto } from './dto/contacts.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async findAll() {
    return await this.contactsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() post: ContactsDto,
    @Request() req,
  ): Promise<ContactEntity> {
    return await this.contactsService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: ContactsDto,
    @Request() req,
  ): Promise<ContactEntity> {
    const {
      numberOfAffectedRows,
      updatedContact,
    } = await this.contactsService.update(id, post, req.user.id);
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(
        'This Contact does not exist, please enter the correct Contact',
      );
    }
    return updatedContact;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.contactsService.delete(id, req.user.id);
    if (deleted === 0) {
      throw new NotFoundException(
        'This Contact does not exist, please enter the correct Contact',
      );
    }
    return 'Sucessfully deleted';
  }
}
