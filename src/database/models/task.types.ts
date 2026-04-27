export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export interface TaskCreationAttributes {
  title: string;
  description?: string;
  completed: boolean;
}