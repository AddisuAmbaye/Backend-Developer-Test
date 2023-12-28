import express from 'express'
import {
    createTaskForProjectCtrl,
    getAllTasksForProjectCtrl,
    getTaskByIdCtrl,
    updateTaskByIdCtrl,
    deleteTaskByIdCtrl,
} from '../controllers/taskCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const taskRouter = express.Router();

// Create a new task within a project
taskRouter.post('/projects/:projectId/tasks', isLoggedIn, createTaskForProjectCtrl)

// Fetch all tasks for a specific project
taskRouter.get('/projects/:projectId/tasks', isLoggedIn, getAllTasksForProjectCtrl)

// Fetch a specific task by ID
taskRouter.get('/tasks/:taskId', isLoggedIn, getTaskByIdCtrl)

// Update a specific task by ID
taskRouter.put('/tasks/:taskId', isLoggedIn, updateTaskByIdCtrl)

// Delete a specific task by ID
taskRouter.delete('/tasks/:taskId', isLoggedIn, deleteTaskByIdCtrl)

export default taskRouter
