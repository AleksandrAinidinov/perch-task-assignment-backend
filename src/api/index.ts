import express from 'express';

import tasksRouter from './tasks';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Root API response',
  });
});

router.use('/', tasksRouter);

export default router;
