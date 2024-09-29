import express from 'express'
import { getUsers, getUser, addUser, updateUser, getUsersByFollowing } from './user.controller.js'



const router = express.Router()

router.get('/',getUsers )
router.get('/follow/:userId', getUsersByFollowing)
router.get('/:userId', getUser)
router.post('/', addUser)
router.put('/', updateUser)

export const userRoutes = router