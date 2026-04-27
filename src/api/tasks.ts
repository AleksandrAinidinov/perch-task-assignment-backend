import express from 'express';
import sequelize from '../database';

const router = express.Router();

// Add GET /tasks - Retrieve a list of Tasks
router.get('/tasks', async (req, res) => {
  const tasks = await sequelize.models.Task.findAll();

  res.json({
    data: tasks,
  });
});

// Add POST /tasks - Create new Tasks
router.post('/tasks', async (req, res) => {
  const tasks = await sequelize.models.Task.findAll();

  res.json({
    data: tasks,
  });
});

// Add PATCH /tasks/:id - Update the status of a Task (complete or incomplete)
router.patch('/tasks/:id', async (req, res) => {
  const tasks = await sequelize.models.Task.findAll();

  res.json({
    data: tasks,
  });
});

// Add DELETE /tasks/:id - Delete a Task
router.delete('/tasks/:id', async (req, res) => {
  const tasks = await sequelize.models.Task.findAll();

  res.json({
    data: tasks,
  });
});

export default router;
