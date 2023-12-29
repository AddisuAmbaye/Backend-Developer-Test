import request from 'supertest'
import app from '../app/app.js'
import bcrypt from 'bcrypt'
import prisma from "../config/db.js"

describe('User Controller', () => {
  // Test the registerUserCtrl function
  describe('registerUserCtrl', () => {
    it('should register a new user and return status code 201', async () => {
      // Mock the request body
      const reqBody = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        isAdmin: false
      }

      // Mock the bcrypt.hash function
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashedPassword')

      // Mock the Prisma user.findUnique and user.create functions
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)
      jest.spyOn(prisma.user, 'create').mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        isAdmin: false,
        created_at: new Date()
      })

      // Send a POST request to the register endpoint
      const response = await request(app).post('/api/auth/register').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        status: 'success',
        message: 'User Registered Successfully',
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        isAdmin: false,
        created_at: expect.any(String)
      })
      expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 10)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: 'testuser' } })
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } })
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: 'testuser',
          email: 'test@example.com',
          isAdmin: false,
          password: 'hashedPassword'
        }
      })
    })

    it('should return status code 400 if username, email, or password is missing', async () => {
      // Mock the request body with missing fields
      const reqBody = {
        username: 'testuser',
        email: 'test@example.com'
      }

      // Send a POST request to the register endpoint
      const response = await request(app).post('/api/auth/register').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ error: 'Username, email, and password are required' })
    })

    it('should return status code 400 if username is already taken', async () => {
      // Mock the request body
      const reqBody = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        isAdmin: false
      }

      // Mock the Prisma user.findUnique function to return an existing user
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ username: 'testuser' })

      // Send a POST request to the register endpoint
      const response = await request(app).post('/api/auth/register').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ error: 'Username is already taken' })
    })

    it('should return status code 400 if email is already registered', async () => {
      // Mock the request body
      const reqBody = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        isAdmin: false
      }

      // Mock the Prisma user.findUnique function to return an existing user
      jest.spyOn(prisma.user, 'findUnique').mockImplementation((params) => {
        if (params.where.email) {
          return Promise.resolve({ email: 'test@example.com', username: 'testuser' })
        }
        return Promise.resolve(null)
      })
      // Send a POST request to the register endpoint
      const response = await request(app).post('/api/auth/register').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ error: 'Email is already registered' })
    })

    it('should return status code 500 if an error occurs during registration', async () => {
      // Mock the request body
      const reqBody = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        isAdmin: false
      }

      // Mock the Prisma user.findUnique function to throw an error
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Database error'))

      // Send a POST request to the register endpoint
      const response = await request(app).post('/api/auth/register').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(500)
      expect(response.body).toEqual({ error: 'Internal Server Error' })
    })
  })
})

describe('User Controller', () => {
  describe('loginUserCtrl', () => {
    it('should log in a user and return status code 200', async () => {
      // Mock the request body
      const reqBody = {
        username: 'testuser',
        password: 'testpassword'
      }

      // Mock the user object from the database
      const userFound = {
        id: 1,
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10)
      }

      // Mock the Prisma user.findUnique function to return the user object
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(userFound)

      // Mock the bcrypt.compare function to return true
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)

      // Send a POST request to the login endpoint
      const response = await request(app).post('/api/auth/login').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        status: 'success',
        message: 'User logged in successfully',
        userFound,
        token: expect.any(String)
      })
    })

    it('should return status code 401 if login credentials are invalid', async () => {
      // Mock the request body
      const reqBody = {
        username: 'testuser',
        password: 'wrongpassword'
      }
      
       // Mock the user object from the database
       const userFound = {
        id: 1,
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10)
      }
      
      // Mock the Prisma user.findUnique function to return the user object
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(userFound)

      // Mock the bcrypt.compare function to return false
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)

      // Send a POST request to the login endpoint
      const response = await request(app).post('/api/auth/login').send(reqBody)

      // Assertions
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual({ error: 'Invalid login credentials' })
    })
  })
})
