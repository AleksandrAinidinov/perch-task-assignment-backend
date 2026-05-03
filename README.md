# Task List API

RESTful API built with ExpressJS and TypeScript for managing tasks.

## Tech Stack
- ExpressJS
- TypeScript
- PostgreSQL (Sequelize ORM)

## Architecture
- **Layered Design**: Separation of concerns between routing, data modeling, and validation.
- **ORM Integration**: Sequelize handles SQL injection protection and data mapping.

## Project Structure
- `src/api`: REST endpoint definitions and logic.
- `src/database/models`: Database schema and model definitions.
- `src/utils`: Centralized validation and helper functions.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start Postgres (Docker):
   ```bash
   docker run --name perch-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgis/postgis:14-3.3
   ```
3. Initialize database:
   ```bash
   npm run db:setup:all
   ```
4. Start server:
   ```bash
   npm run dev
   ```

## Endpoints
- `GET /tasks` - Retrieve a list of tasks
- `POST /tasks` - Create new tasks (Title, Description)
- `PATCH /tasks/:id` - Update task status (complete/incomplete)
- `DELETE /tasks/:id` - Delete a task
