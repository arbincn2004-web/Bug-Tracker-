# BugBoard - MERN Bug Tracker

A beginner-friendly issue tracking project built with MongoDB, Express, React and Node.js. Users can register/login, create projects, create issues, update issue status, search issues and add comments.


## Features
- JWT authentication and password hashing
- Project creation and deletion
- Issue creation, listing, updating, deletion
- Issue status: To Do, In Progress, Done
- Priority: Low, Medium, High, Critical
- Dashboard counts and recent issue list
- Search issues by title
- Issue comments endpoint
- Responsive React interface

## Requirements
- Node.js 18+ (recommended)
- MongoDB local installation or MongoDB Atlas account
- VS Code


## Run the backend
1. Open the `backend` folder in terminal.
2. Install packages: `npm install`
3. Copy `.env.example` to `.env` and update values if needed.
4. Start development server: `npm run dev` (or `npm start`).
Backend runs on `http://localhost:5000`.


## Run the frontend
1. Open a second terminal in `frontend`.
2. Install packages: `npm install`
3. Start Vite: `npm run dev`
4. Open the address printed in terminal, usually `http://localhost:5173`.


## MongoDB configuration
For local MongoDB, keep `MONGO_URI=mongodb://127.0.0.1:27017/bugtracker` in the backend `.env`.
For MongoDB Atlas, replace MONGO_URI with your Atlas connection string and ensure your IP is allowed in Network Access.


## API endpoints
### Auth
- `POST /api/auth/register` - name, email, password
- `POST /api/auth/login` - email, password
- `GET /api/auth/me` - current user (Bearer token)

### Projects (Bearer token required)
- `GET /api/projects`
- `POST /api/projects` - name, description
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Issues (Bearer token required)
- `GET /api/issues` - optional query params: project, status, priority, search
- `POST /api/issues` - title, description, project, priority, optional assignee
- `PUT /api/issues/:id` - update fields (including status)
- `DELETE /api/issues/:id`
- `POST /api/issues/:id/comments` - text

## Notes
This is a learning project starter. For a production app, add stricter authorization checks on issue update/delete/comment, project membership permissions, validation, rate limiting, tests, and file uploads. The current issue listing is global to authenticated users; project scoping should be strengthened before production use.
