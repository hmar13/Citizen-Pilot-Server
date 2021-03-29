import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Votes } from '../votes/votes.entity';

@Table
export class Proposal extends Model<Proposal> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  location: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  votes: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  approved: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsToMany(() => User, () => Votes)
  users: User[];
}
