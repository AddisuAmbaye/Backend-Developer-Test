import prisma from "../config/db.js";
import asyncHandler from 'express-async-handler'

// Create a new project
export const createProjectCtrl = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const userId = req.userAuth

    if (!name) {
        res.status(400).json({ error: 'Name is required' })
        return
    }

    const newProject = await prisma.project.create({
        data: {
            name,
            description,
            user: {
                connect: { id: userId }
            }
        }
    })

    res.status(201).json({
        status: 'success',
        message: 'Project created successfully',
        project: newProject
    })
})
  
// Fetch all projects for the authenticated user
export const getAllProjectsCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuth

    const projects = await prisma.project.findMany({
        where: {
            user_id: userId
        }
    })

    res.json({
        status: 'success',
        message: 'Fetched all projects successfully',
        projects
    })
})
// Fetch all projects
export const getAllProjectsAdminCtrl = asyncHandler(async (req, res) => {
    const projects = await prisma.project.findMany();

    res.json({
        status: 'success',
        message: 'Fetched all projects successfully',
        projects
    })
})

// Fetch a specific project by ID
export const getProjectByIdCtrl = asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10)
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (!project) {
        res.status(404).json({ error: 'Project not found' })
    } else {
        res.json({
            status: 'success',
            message: 'Fetched project successfully',
            project
        })
    }
})

// Update a specific project by ID
export const updateProjectByIdCtrl = asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10)
    const { name, description } = req.body
    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            name,
            description
        }
    })

    res.json({
        status: 'success',
        message: 'Project updated successfully',
        project: updatedProject
    })
})

// Delete a specific project by ID
export const deleteProjectByIdCtrl = asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10)
    const deletedProject = await prisma.project.delete({
        where: {
            id: projectId,
        }
    })

    res.json({
        status: 'success',
        message: 'Project deleted successfully',
        project: deletedProject
    })
})
