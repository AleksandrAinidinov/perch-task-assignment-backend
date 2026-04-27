import express from 'express';
import Task from '../database/models/task.model'

const router = express.Router();

// GET /tasks - Retrieve a list of Tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();

    return res.json({
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks!" });
  }
});

// POST /tasks - Create new Tasks
router.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required!" });
    }

    const newTask = await Task.create({ title, description, completed: false });

    return res.json({
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task!" });
  }
});

// PATCH /tasks/:id - Update the status of a Task (complete or incomplete)
router.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const taskToChange = await Task.findByPk(id);

    if (!taskToChange) {
      return res.status(404).json({ message: "Task not found!" });
    }

    await taskToChange.update({
      completed: completed,
    });

    res.json({
      data: taskToChange,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to edit task's status!" });
  }
});

// DELETE /tasks/:id - Delete a Task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const taskToDelete = await Task.findByPk(id);

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found!" });
    }

    await taskToDelete.destroy();

    return res.status(204).json({ message: "Task deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task!" });
  }
});

export default router;
