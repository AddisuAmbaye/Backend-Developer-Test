import express from 'express';
import { registerUserCtrl, loginUserCtrl } from '../controllers/userCtrl.js';

const userRouter = express.Router();

// Define the user registration route
userRouter.post('/register', registerUserCtrl);
userRouter.post("/login", loginUserCtrl);

export default userRouter;
