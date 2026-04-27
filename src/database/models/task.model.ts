import { PrimaryKey, Model, Table, Column, AllowNull } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'Tasks',
})
class Task extends Model<Task> {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    comment: 'Unique identifier',
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Title of the task',
  })
  declare title: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Description of the task',
  })
  declare description: string;

  @Column({
    type: DataTypes.BOOLEAN,
    comment: 'Flag indicating if the task is completed',
    defaultValue: false,
  })
  declare completed: boolean;
}

export default Task;