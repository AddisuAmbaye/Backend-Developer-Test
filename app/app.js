import express from "express"
import dotenv from 'dotenv'
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js"
import userRoutes from "../routes/userRoutes.js"
import projectRoutes from "../routes/projectRoutes.js"
import cors from "cors"
import path from "path"
import morgan from "morgan"
dotenv.config()

const app = express()
app.use(cors())

//pass incoming data 
app.use(express.json())
//url encoded
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))

//serve static files
app.use(express.static("public"))
//Home route
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"))
})
// routes
app.use('/api/auth', userRoutes)
app.use('/api/projects', projectRoutes)
//err middleware
app.use(notFound)
app.use(globalErrorHandler) 
export default app
