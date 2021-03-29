import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Employee } from '../employees/employee.entity';

@Table
export class Project extends Model<Project> {
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
    type: DataType.DECIMAL,
    allowNull: false,
  })
  completion: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image: string;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employeeId: number;

  @BelongsTo(() => Employee)
  employee: Employee;
}
