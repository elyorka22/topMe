import express from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users.js'

export const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUserById)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)
