
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table
export class Project extends Model<Project> {
  @Column({
    type:DataType.STRING,
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
    type: DataType.NUMBER,
    allowNull: false,
  })
  completion: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image: string;

  // @ForeignKey(()=> EMPLOYEE)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // EMPLOYEEID: number;

  // @BelongsTo(()=> EMPLOYEE)
  // employee: EMPLOYEE!
}