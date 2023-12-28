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
import { ownProject } from './middlewares/authMiddleware.js'

const projectRouter = express.Router()

// Create a new project
projectRouter.post('/', isLoggedIn, createProjectCtrl)

// Fetch all projects for the authenticated user
projectRouter.get('/', isLoggedIn, ownProject, getAllProjectsCtrl)

// Create a new task within a project
projectRouter.post('/:projectId/tasks', isLoggedIn, ownProject, createTaskForProjectCtrl)

// Fetch all tasks for a specific project
projectRouter.get('/:projectId/tasks', isLoggedIn, ownProject, getAllTasksForProjectCtrl)

// Fetch a specific project by ID
projectRouter.get('/:projectId', isLoggedIn, ownProject, getProjectByIdCtrl)

// Update a specific project by ID
projectRouter.put('/:projectId', isLoggedIn,ownProject, updateProjectByIdCtrl)

// Delete a specific project by ID
projectRouter.delete('/:projectId', isLoggedIn, ownProject, deleteProjectByIdCtrl)

export default projectRouter
 