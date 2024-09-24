import express from 'express'
import { getUsers, getUser, addUser } from './user.controller.js'



const router = express.Router()

router.get('/',getUsers )
router.get('/:userId', getUser)
router.post('/', addUser)

export const userRoutes = router