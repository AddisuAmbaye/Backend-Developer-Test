import express from 'express'
import {
    createProjectCtrl,
    getAllProjectsCtrl,
    getProjectByIdCtrl,
    updateProjectByIdCtrl,
    deleteProjectByIdCtrl,
} from '../controllers/projectCtrl.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'


const projectRouter = express.Router()

// Create a new project
projectRouter.post('/', isLoggedIn, createProjectCtrl)

// Fetch all projects for the authenticated user
projectRouter.get('/', isLoggedIn, getAllProjectsCtrl)

// Fetch a specific project by ID
projectRouter.get('/:projectId', isLoggedIn, getProjectByIdCtrl)

// Update a specific project by ID
projectRouter.put('/:projectId', isLoggedIn, updateProjectByIdCtrl)

// Delete a specific project by ID
projectRouter.delete('/:projectId', isLoggedIn, deleteProjectByIdCtrl)

export default projectRouter
 