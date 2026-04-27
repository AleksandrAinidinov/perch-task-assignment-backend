export const validateTaskInput = (title: any, description: any): string | null => {
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return 'Title is required and must be a valid string!';
  }

  // Description can be empty, but if provided - must be a string
  if (description !== undefined && typeof description !== 'string') {
    return 'Description must be a valid string!';
  }
  return null;
};

export const validateTaskStatus = (completed: any): string | null => {
  if (completed === undefined || typeof completed !== 'boolean') {
    return 'Completed status is required and must be a boolean value (true/false)!';
  }

  return null;
};

export const validateId = (id: any): { valid: boolean; parsedId?: number; message?: string } => {
  const parsedId = Number(id);

  if (isNaN(parsedId) || parsedId <= 0) {
    return { valid: false, message: 'Invalid Task ID!' };
  }

  return { valid: true, parsedId };
};
