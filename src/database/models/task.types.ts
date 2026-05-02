export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  priority: string;
  dueDate: Date;
  completed: boolean;
}

export interface TaskCreationAttributes {
  title: string;
  description?: string;
  priority: string;
  dueDate: Date;
  completed: boolean;
}