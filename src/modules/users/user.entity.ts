import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Proposal } from '../proposals/proposals.entity';
import { Votes } from '../votes/votes.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  favourites: string[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  voted: number[];

  @BelongsToMany(() => Proposal, () => Votes)
  proposals: Proposal[];
}
