import prisma from "../config/db.js"
import asyncHandler from 'express-async-handler'

// Create a new task within a project
export const createTaskForProjectCtrl = asyncHandler(async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10)
  const { title, description, due_date } = req.body
  const userId = req.userAuth
  
  if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
  }

  const newTask = await prisma.task.create({
      data: {
          title,
          description,
          due_date: new Date("2023-12-31").toISOString(),
          project: {
              connect: { id: projectId },
          },
          user: {
              connect: { id: userId },
          },
      },
  });

  res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      task: newTask,
  })
})

// Fetch all tasks for a specific project
export const getAllTasksForProjectCtrl = asyncHandler(async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10)
  const tasks = await prisma.task.findMany({
    where: {
      project_id: projectId,
    },
  })

  res.json({
    status: 'success',
    message: 'Fetched all tasks for the project successfully',
    tasks,
  })
})

// Fetch a specific task by ID
export const getTaskByIdCtrl = asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    }
  })

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json({
      status: 'success',
      message: 'Fetched task successfully',
      task,
    })
  }
})

// Update a specific task by ID
export const updateTaskByIdCtrl = asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10)
  const { title, description, due_date, completed } = req.body
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
      description,
      due_date,
      completed,
    },
  })

  res.json({
    status: 'success',
    message: 'Task updated successfully',
    task: updatedTask,
  })
})

// Delete a specific task by ID
export const deleteTaskByIdCtrl = asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10)
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    }
  })

  res.json({
    status: 'success',
    message: 'Task deleted successfully',
    task: deletedTask,
  })
})
