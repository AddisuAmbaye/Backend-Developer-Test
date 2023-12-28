import express from "express"
import dotenv from 'dotenv'
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js"
import userRoutes from "../routes/userRoutes.js"
import cors from "cors"
import path from "path"
dotenv.config()

const app = express()
app.use(cors())

//pass incoming data
app.use(express.json())
//url encoded
app.use(express.urlencoded({ extended: true }));

//serve static files
app.use(express.static("public"))
//Home route
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"))
})
// routes
app.use('/api/auth', userRoutes)
//err middleware
app.use(notFound)
app.use(globalErrorHandler) 
export default app
