import express from "express";
import db from "../config/db.js";
import dotenv from 'dotenv';
// import { globalErrorHandler,notFound } from "../middlewares/globalErrorHandler.js";
import cors from "cors";
import path from "path";
import userRoutes from "../routes/userRoutes.js";

dotenv.config();

//db connect 
db();
const app = express();
app.use(cors());

//pass incoming data
app.use(express.json());
//url encoded
app.use(express.urlencoded({ extended: true }));

//serve static files
app.use(express.static("public"));
//routes
app.use('/api/v1/users', userRoutes);
//Home route
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});
// routes

//err middleware
// app.use(notFound);
// app.use(globalErrorHandler);
export default app;
