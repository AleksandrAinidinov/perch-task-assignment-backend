import { PrimaryKey, Model, Table, Column, AllowNull } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { TaskAttributes, TaskCreationAttributes } from './task.types';
import { defaultValueSchemable } from 'sequelize/types/utils';

@Table({
  tableName: 'Tasks',
  paranoid: true,
})
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
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
    type: DataTypes.TEXT,
    comment: 'Priority of the task ((Low, Medium, High)',
    defaultValue: 'Medium',
  })
  declare priority: string;

  @Column({
    type: DataTypes.BOOLEAN,
    comment: 'Flag indicating if the task is completed',
    defaultValue: false,
  })
  declare completed: boolean;
}

export default Task;