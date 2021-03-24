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
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { Contact as ContactEntity } from './contacts.entity';
import { ContactsDto } from './dto/contacts.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Get()
  async findAll() {
    // Get all contacts in the db
    return await this.contactsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: ContactsDto, @Request() req): Promise<ContactEntity> {
    // Create a new contact and return the newly created contact
    return await this.contactsService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: ContactsDto, @Request() req): Promise<ContactEntity> {
      // get the number of row for the update
    const { numberOfAffectedRows, updatedContact } = await this.contactsService.update(
        id, post, req.user.id
    );

    // If zero, contact doesnt exist in the DB
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This Contact does not exist, please enter the correct Contact');
    }

    //Return the updated contact
    return updatedContact
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // Delete the contact with this id
    const deleted = await this.contactsService.delete(id, req.user.id);

    // If zero, contact does not exist in the DB
    if (deleted === 0) {
      throw new NotFoundException('This Contact does not exist, please enter the correct Contact');
    }

    //return sucessful deltion message
    return 'Sucessfully deleted';
  }
}
