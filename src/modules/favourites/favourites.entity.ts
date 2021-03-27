import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Favourite extends Model<Favourite> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    values: ['proposals', 'reports'],
  })
  type: string;

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
    type: DataType.INTEGER,
    allowNull: true,
  })
  votes: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  completion: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}