import { Injectable, Inject } from '@nestjs/common';
import { Contact } from './contacts.entity';
import { ContactsDto } from './dto/contacts.dto';
import { Employee } from '../employees/employee.entity';
import { CONTACT_REPOSITORY } from '../../core/constants';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly contactsRepository: typeof Contact,
  ) {}

  async create(contacts: ContactsDto, userId): Promise<Contact> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.contactsRepository.create<Contact>({
      ...contacts,
      userId,
    });
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactsRepository.findAll<Contact>({
      include: [{ model: Employee, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.contactsRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [
      numberOfAffectedRows,
      [updatedContact],
    ] = await this.contactsRepository.update(
      { ...data },
      { where: { id, userId }, returning: true },
    );

    return { numberOfAffectedRows, updatedContact };
  }
}
