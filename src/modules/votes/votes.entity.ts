import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Proposal } from '../proposals/proposals.entity';
import { User } from '../users/user.entity';

@Table
export class Votes extends Model<Votes> {
  @ForeignKey(() => Proposal)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  proposalId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
