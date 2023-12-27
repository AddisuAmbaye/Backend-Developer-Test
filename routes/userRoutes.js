import express from 'express';
import { registerUser } from '../controllers/userCtrl';

const userRouter = express.Router();

// Define the user registration route
userRouter.post('/register', registerUser);

export default userRouter;
