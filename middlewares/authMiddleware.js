import prisma from "../config/db.js"
import asyncHandler from "express-async-handler"

// Middleware to check if the user owns the task
export const ownsTask = asyncHandler(async (req, res, next) => {
    const userId = req.userAuth
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    const taskId = parseInt(req.params.taskId)
    const userOwnsTask = await prisma.project.findUnique({
        where: {
          id: taskId,
          user_id: userId,
        }
      })
      
    if (userOwnsTask || user?.isAdmin) {
        next() // User owns the task or is an admin, proceed to the next middleware or route
    } else {
        res.status(403).json({ error: 'Permission denied' }) // User does not own the task
    }
})

// Middleware to check if the user owns the project
export const ownsProject = asyncHandler(async (req, res, next) => {
    const userId = req.userAuth
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    const projectId = parseInt(req.params.projectId)
    const userOwnsProject = await prisma.project.findUnique({
        where: {
          id: projectId,
          user_id: userId,
        }
      })

    if (userOwnsProject || user?.isAdmin) {
        next() // User owns the project or is an admin, proceed to the next middleware or route
    } else {
        res.status(403).json({ error: 'Permission denied' }) // User does not own the project
    }
})
