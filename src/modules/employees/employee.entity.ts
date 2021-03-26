import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Employee extends Model<Employee> {
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
    type: DataType.STRING,
    allowNull: true,
  })
  department: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  access: string;
}