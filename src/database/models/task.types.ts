export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  priority: string;
  completed: boolean;
}

export interface TaskCreationAttributes {
  title: string;
  description?: string;
  priority: string;
  completed: boolean;
}