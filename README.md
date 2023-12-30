# Project Management API

This is a RESTful API for managing projects. It's built with Node.js, Express, and Prisma.

## Features

- User authentication
- Create, read, update, and delete tasks and projects

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository: `git clone https://github.com/AddisuAmbaye/Backend-Developer-Test.git`
2. Install the dependencies: `npm install`
3. Start the server: `npm start` or `npm run server`

## Running the Tests

Run the tests with the following command: `npm run test`

## API Endpoints

### User Endpoints

- POST /api/users: Register a new user
- POST /api/users/login: Log in a user

### Project Endpoints

- POST /api/projects: Create a new project
- GET /api/projects: Fetch all projects for the authenticated user
- GET /api/projects/:projectId: Fetch a specific project by ID
- PUT /api/projects/:projectId: Update a specific project by ID
- DELETE /api/projects/:projectId: Delete a specific project by ID
- POST /api/projects/:projectId/tasks: Create a new task within a project

### Task Endpoints

- GET /api/tasks/:taskId: Fetch a specific task by ID
- PUT /api/tasks/:taskId: Update a specific task by ID
- DELETE /api/tasks/:taskId: Delete a specific task by ID

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details