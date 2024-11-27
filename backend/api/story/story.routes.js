import express from 'express'
import { addStory, deleteStory, getStories, getStoriesByFollowing, getStory, updateStory } from './story.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'


const router = express.Router()

router.get("/", getStories)
router.get("/follow/:userId", getStoriesByFollowing)
router.get("/unfollow/:userId", getStoriesByFollowing)
router.get("/:storyId", getStory)
router.delete("/:storyId", deleteStory)
router.post("/", addStory)
router.put('/',updateStory)

export const storiesRoutes = router