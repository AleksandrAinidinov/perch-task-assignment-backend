import express, { Request, Response } from 'express';
import Task from '../database/models/task.model';
import { validateTaskInput, validateTaskStatus, validateId } from '../utils/validationHelpers';

const router = express.Router();

// GET /tasks - Get all Tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      order: [['id', 'ASC']]
    });

    res.json({
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks!" });
  }
});

// POST /tasks - Create a new Task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const validationError = validateTaskInput(title, description);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newTask = await Task.create({ title: title.trim(), description: description?.trim(), completed: false });

    res.status(201).json({
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task!" });
  }
});

// PATCH /tasks/:id - Update the status of a Task (complete or incomplete)
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const validationOfId = validateId(id);
    if (!validationOfId.valid) {
      return res.status(400).json({ message: validationOfId.message });
    }

    const validationError = validateTaskStatus(completed);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const taskToChange = await Task.findByPk(validationOfId.parsedId);

    if (!taskToChange) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    await taskToChange.update({
      completed: completed,
    });

    res.json({
      data: taskToChange,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to edit task's status!" });
  }
});

// DELETE /tasks/:id - Delete a Task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idValidation = validateId(id);
    if (!idValidation.valid) {
      return res.status(404).json({ message: idValidation.message });
    }

    const taskToDelete = await Task.findByPk(idValidation.parsedId);

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    await taskToDelete.destroy();

    res.status(200).json({ message: 'Task deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task!" });
  }
});

export default router;
