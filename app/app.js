import express from "express"
import dotenv from 'dotenv'
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js"
import userRoutes from "../routes/userRoutes.js"
import projectRoutes from "../routes/projectRoutes.js"
import taskRoutes from "../routes/taskRoutes.js"
import cors from "cors"
import morgan from "morgan"
dotenv.config()

const app = express()
app.use(cors())

//pass incoming data 
app.use(express.json())
//url encoded
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))

// routes
app.use('/api/auth', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
//err middleware
app.use(notFound)
app.use(globalErrorHandler) 
export default app
