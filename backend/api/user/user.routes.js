import express from 'express'
import { getUsers, getUser, addUser, updateUser } from './user.controller.js'



const router = express.Router()

router.get('/',getUsers )
router.get('/:userId', getUser)
router.post('/', addUser)
router.put('/', updateUser)

export const userRoutes = router