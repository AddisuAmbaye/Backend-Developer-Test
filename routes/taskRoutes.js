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

// Fetch a specific task by ID
taskRouter.get('/:taskId', isLoggedIn, getTaskByIdCtrl)

// Update a specific task by ID
taskRouter.put('/:taskId', isLoggedIn, updateTaskByIdCtrl)

// Delete a specific task by ID
taskRouter.delete('/:taskId', isLoggedIn, deleteTaskByIdCtrl)

export default taskRouter
