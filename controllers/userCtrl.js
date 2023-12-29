import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";

export const registerUserCtrl = asyncHandler(async(req, res) => {
    
    const { username, email, password, isAdmin } = req.body;
  
    //Check if username and email are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
  
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Check if the username is already taken
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
  
      if (existingUsername) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
  
      // Check if the email is already registered
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingEmail) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
  
      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          isAdmin,
          password: hashedPassword,
        },
      });
  
      // Return the newly created user (excluding the password)
      res.status(201).json({
        status: "success",
        message: "User Registered Successfully",
        id: newUser.id, 
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        created_at: newUser.created_at,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
 })

export const loginUserCtrl = asyncHandler(async(req, res) => {
  const { username, password } = req.body;

  // Find the user in the database by email
  const userFound = await prisma.user.findUnique({
    where: { username },
  });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: 'success',
      message: 'User logged in successfully',
      userFound,
      token: generateToken(userFound?.id),
    });
  } else {
    throw new Error('Invalid login credentials');
  }
})

