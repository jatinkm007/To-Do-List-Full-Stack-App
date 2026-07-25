# Full-Stack To-Do Application

A simple CRUD To-Do application built with React, Express, Node.js and MongoDB. The frontend sends HTTP requests with Axios, while the backend stores tasks in MongoDB through Mongoose.

## Live Preview - (*https://to-do-list-full-stack-app.vercel.app/*)

## Features

- Create a task with a title and optional description
- View all tasks
- Search tasks by title or description
- Edit an existing task
- Mark a task as completed or pending
- Delete a task
- Display validation errors returned by the backend
- Display a separate message when the backend cannot be reached

## Technologies Used

**Frontend:** React, Vite, Axios, CSS  
**Backend:** Node.js, Express.js, Mongoose, CORS, dotenv  
**Database:** MongoDB  
**API testing:** Postman

## Project Structure

```text
todo-fullstack-app/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Request validation and HTTP responses
│   ├── middleware/      # 404 and error handling
│   ├── models/          # Mongoose task schema
│   ├── routes/          # API routes
│   ├── services/        # Database queries
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios API functions
│   │   └── components/
│   └── .env.example
├── postman/
│   └── Todo_API.postman_collection.json
└── docs/
    └── POSTMAN_TESTING.md
```

## Prerequisites

Install these before running the project:

- Node.js 18 or newer
- npm
- MongoDB Community Server, or a MongoDB Atlas connection string
- Postman for API testing

## How to Run

### 1. Download and open the project

```bash
cd todo-fullstack-app
```

### 2. Configure and run the backend

```bash
cd backend
npm install
```

Create a file named `.env` inside `backend`. Copy the values from `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGO_URI` with your own connection string. Do not upload the real `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

Expected terminal output:

```text
MongoDB connected
Server running on http://localhost:5000
```

Open `http://localhost:5000` in a browser. It should return:

```json
{ "message": "Todo API is running." }
```

### 3. Configure and run the frontend

Open a second terminal:

```bash
cd todo-fullstack-app/frontend
npm install
```

Create a file named `.env` inside `frontend`. Copy the value from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Start the frontend:

```bash
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

> Restart the Vite server whenever the frontend `.env` value is changed.

## Environment Variables

### Backend

| Variable | Purpose | Local value example |
|---|---|---|
| `PORT` | Express server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/todo_app` |
| `CLIENT_URL` | Frontend address allowed by CORS | `http://localhost:5173` |

### Frontend

| Variable | Purpose | Local value example |
|---|---|---|
| `VITE_API_URL` | Complete base URL of the task API | `http://localhost:5000/api/tasks` |

## API Endpoints

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks?search=word` | Search tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update title and description |
| PATCH | `/api/tasks/:id/status` | Update completed status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Create-task request body

```json
{
  "title": "Complete assignment",
  "description": "Finish the API documentation"
}
```

### Update-status request body

```json
{
  "completed": true
}
```

## Validation and Error Handling

- A title must contain at least two characters.
- The backend checks `ObjectId` format before update, status, and delete database queries.
- A valid but unknown ID returns `404 Task not found`.
- An incorrectly formatted ID returns `400 Invalid task id format`.
- Invalid JSON and Mongoose validation errors return `400` responses.
- The frontend identifies responses such as validation errors separately from network failures.
- When Axios receives no response, the UI tells the user to check the backend and API URL.

## Postman Testing

Import this collection into Postman:

```text
postman/Todo_API.postman_collection.json
```

The collection stores the created task ID automatically and tests the complete CRUD flow. Detailed steps and the test checklist are in [docs/POSTMAN_TESTING.md](docs/POSTMAN_TESTING.md).

## Build and Code Checks

Frontend lint:

```bash
cd frontend
npm run lint
```

Frontend production build:

```bash
npm run build
```

Backend syntax check:

```bash
cd ../backend
node --check server.js
node --check controllers/task.controller.js
node --check services/task.service.js
```

## How the Backend Flow Works

1. A route receives the HTTP request.
2. The controller reads and validates request data.
3. The controller calls a service function.
4. The service performs the Mongoose database query.
5. The controller sends the final HTTP response.
6. Unexpected errors are passed to the error middleware using `next(error)`.

This separation keeps HTTP code in controllers and database code in services.

## Author

Jatin Kumar Mishra
