import request from 'supertest';
import sequelize from '../../src/database';
import app from '../../src/app';
import Task from '../../src/database/models/task.model';

describe('Tasks API Integration Tests', () => {
  // Sync the database before running tests
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  describe('GET /v1/tasks', () => {
    it('should respond with a 200 and a data array', async () => {
      const response = await request(app)
        .get('/v1/tasks')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    })
  });

  describe('POST /v1/tasks', () => {
    it('should create a new task and return 201', async () => {
      const validTask = {
        title: 'New Test Task',
        description: '201 Test Description'
      }

      const response = await request(app)
        .post('/v1/tasks')
        .send(validTask)
        .expect(201)

      expect(response.body.data.title).toBe(validTask.title);
      expect(response.body.data.description).toBe(validTask.description);
      expect(response.body.data.completed).toBe(false);
    });

    it('should return 400 if title missing', async () => {
      const invalidTask = {
        title: '',
        description: '400 Test Description'
      }

      const response = await request(app)
        .post('/v1/tasks')
        .send(invalidTask)
        .expect(400)

      expect(response.body).toHaveProperty('message');
    });

    it("trims inputs properly", async () => {
      const res = await request(app)
        .post("/v1/tasks")
        .send({
          title: " Test    ",
          description: "  Description  "
        });

      expect(res.body.data.title).toBe("Test");
      expect(res.body.data.description).toBe("Description");
    });
  });

  describe('PATCH /v1/tasks/:id', () => {
    it('should update the status of a task and return 200', async () => {
      const task = await Task.create({
        title: 'Test Patch Title',
        description: "Test Description",
        completed: false
      })

      const response = await request(app)
        .patch(`/v1/tasks/${task.id}`)
        .send({ completed: true })
        .expect(200)

      expect(response.body.data.completed).toBe(true);
    });

    it("should return 404 for non existing task", async () => {
      await request(app)
        .patch("/v1/tasks/1000")
        .send({ completed: true })
        .expect(404);
    });
  });

  describe("DELETE /v1/tasks/:id", () => {
    it("should delete a task", async () => {
      const task = await Task.create({
        title: "Test Delete Title",
        description: "Test Description",
        completed: false
      });

      await request(app)
        .delete(`/v1/tasks/${task.id}`)
        .expect(200);

      const deletedTask = await Task.findByPk(task.id);
      expect(deletedTask).toBeNull();
    });

    it("should return 404 for non existing task", async () => {
      await request(app)
        .delete("/v1/tasks/1000")
        .expect(404);
    });
  });
});
