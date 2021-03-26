import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from '../employees/employee.entity';

@Table
export class News extends Model<News> {
  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  title: string;

  @Column({
      type: DataType.TEXT,
      allowNull: false,
  })
  shortDescription: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
})
  longDescription: string;

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
    type: DataType.STRING,
  })
  date: string;

  @ForeignKey(()=> Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employeeId: number;

  @BelongsTo(()=> Employee)
  employee: Employee;
}