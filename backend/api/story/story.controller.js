import { ObjectId } from "mongodb";
import { loggerService } from "../../services/logger.service.js";
import { StoryService } from "./story.service.js";


export async function getStories(req, res){
    const filterBy={}
    try {
        const stories = await StoryService.query(filterBy)
        res.send(stories)
    } catch (err) {
        console.log("Couldnt get stories", err)
        res.status(400).send("Couldnt get stories")
    }
}

export async function getStoriesByFollowing(req, res){
    const {userId } = req.params
    let explore = false
    console.log("req:",req.path)
    if (req.path.includes("unfollow")){explore = true}

    try {
        const stories = await StoryService.queryByFollowing(userId, explore)
        res.send(stories)
    } catch (err) {
        console.log("cant get stories to user with ID:", userId, err)
        res.status(401).send("Stories not found")
    }
}

export async function getStory( req, res){
    const {storyId} = req.params

    try {
        const story = await StoryService.getById(storyId)
        loggerService.info(`story ${storyId} was found`)
        res.send(story)
    } catch (err) {
        console.log("cant get story with ID:", storyId, err)
        res.status(401).send("Story not found")
    }
}

export async function deleteStory(req, res){
    const {storyId} = req.params

    try {
        await StoryService.remove(storyId)
        res.send("story deleted")
    } catch (err) {
        console.log('err', err)
        res.status(400).send(`Couldn't delete story`)
    }
}

export async function addStory(req, res){
    const { txt , imgUrl, by , loc, comments, likedBy, tags } = req.body
    const storyToSave = {txt, imgUrl, by , loc, comments, likedBy, tags}
    try {
        const savedStory = await StoryService.add(storyToSave)
        res.send(savedStory)
        loggerService.info("Saved succffuly")
    } catch (error) {
        console.log(error)
        res.status(400).send("Couldnt save story")
    }
}

export async function updateStory(req, res){
    const {comments, likedBy, _id } = req.body
    const storyToUpdate = {comments, likedBy, _id}

    try {
        const updateStory = await StoryService.update(storyToUpdate)
        res.send(updateStory)
    } catch (err) {
        console.log(`err:`, err)
        res.status(400).send(`Couldnt update story`)
    }
}