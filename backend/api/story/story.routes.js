import express from 'express'
import { addStory, deleteStory, getStories, getStory, updateStory } from './story.controller.js'


const router = express.Router()

router.get("/", getStories)
router.get("/:storyId", getStory)
router.delete("/:storyId", deleteStory)
router.post("/", addStory)
router.put('/', updateStory)

export const storiesRoutes = router