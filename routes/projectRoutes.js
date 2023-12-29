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
import { ownsProject } from '../middlewares/authMiddleware.js'

const projectRouter = express.Router()

// Create a new project
projectRouter.post('/', isLoggedIn, createProjectCtrl)

// Fetch all projects for the authenticated user
projectRouter.get('/', isLoggedIn, ownsProject, getAllProjectsCtrl)

// Fetch a specific project by ID
projectRouter.get('/:projectId', isLoggedIn, ownsProject, getProjectByIdCtrl)

// Update a specific project by ID
projectRouter.put('/:projectId', isLoggedIn, ownsProject, updateProjectByIdCtrl)
 
// Delete a specific project by ID
projectRouter.delete('/:projectId', isLoggedIn, ownsProject, deleteProjectByIdCtrl) 

// Create a new task within a project
projectRouter.post('/:projectId/tasks', isLoggedIn, ownsProject, createTaskForProjectCtrl)

// Fetch all tasks for a specific project
projectRouter.get('/:projectId/tasks', isLoggedIn, ownsProject, getAllTasksForProjectCtrl)


export default projectRouter
 