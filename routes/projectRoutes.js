import express from 'express'
import {
    createProjectCtrl,
    getAllProjectsCtrl,
    getProjectByIdCtrl,
    updateProjectByIdCtrl,
    deleteProjectByIdCtrl,
} from '../controllers/projectCtrl.js'
import {
    createTaskForProjectCtrl,
    getAllTasksForProjectCtrl,
} from '../controllers/taskCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import isAdmin from "../middlewares/isAdmin.js"

const projectRouter = express.Router()

// Create a new project
projectRouter.post('/', isLoggedIn, createProjectCtrl)

// Fetch all projects for the authenticated user
projectRouter.get('/', isLoggedIn, isAdmin, getAllProjectsCtrl)

// Create a new task within a project
projectRouter.post('/:projectId/tasks', isLoggedIn, createTaskForProjectCtrl)

// Fetch all tasks for a specific project
projectRouter.get('/:projectId/tasks', isLoggedIn, isAdmin, getAllTasksForProjectCtrl)

// Fetch a specific project by ID

projectRouter.get('/:projectId', isLoggedIn, getProjectByIdCtrl)

// Update a specific project by ID
projectRouter.put('/:projectId', isLoggedIn, updateProjectByIdCtrl)

// Delete a specific project by ID
projectRouter.delete('/:projectId', isLoggedIn, deleteProjectByIdCtrl)

export default projectRouter
 