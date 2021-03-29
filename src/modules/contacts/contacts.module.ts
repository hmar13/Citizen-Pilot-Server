import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactsProviders } from './contacts.providers';

@Module({
  providers: [ContactsService, ...contactsProviders],
  controllers: [ContactsController],
})
export class ContactsModule {}
