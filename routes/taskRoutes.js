import express from 'express'
import {
    getTaskByIdCtrl,
    updateTaskByIdCtrl,
    deleteTaskByIdCtrl,
} from '../controllers/taskCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { ownsTask } from './authMiddleware.js'

const taskRouter = express.Router();

// Fetch a specific task by ID
taskRouter.get('/:taskId', isLoggedIn, getTaskByIdCtrl)

// Update a specific task by ID
taskRouter.put('/:taskId', isLoggedIn, ownsTask, updateTaskByIdCtrl)

// Delete a specific task by ID
taskRouter.delete('/:taskId', isLoggedIn, ownsTask, deleteTaskByIdCtrl)

export default taskRouter
