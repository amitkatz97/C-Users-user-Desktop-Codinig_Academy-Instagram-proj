import { ObjectId } from "mongodb";
import { loggerService } from "../../services/logger.service.js";
import { StoryService } from "./story.service.js";
import { socketService } from '../../services/socket.service.js';
import { authService } from '../auth/auth.service.js'
import { Socket } from "socket.io";
import _ from 'lodash'




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

export async function updateStory (req, res){
    // const {comments, likedBy, _id} = req.body
    var { loginToken } = req.cookies
    const { body : story } = req

    try {
        const currentStory = await StoryService.getById(story._id)
        const loggedinUser = authService.validateToken(loginToken)
        const updateStory = await StoryService.update(story)
        const dataToDeliverd ={updateStory: updateStory, loggedinUser :loggedinUser}
        // socketService.broadcast({type: 'story-updated', data: updateStory, userId: loggedinUser._id})
        const changedFields = []

        for (const key in story) {
            if (story.hasOwnProperty(key)) {
              const oldValue = currentStory[key];
              const newValue = story[key];
      
              // If the field is an object, do deep comparison
              if (_.isObject(oldValue) && !Array.isArray(oldValue)) {
                if (!_.isEqual(oldValue, newValue)) {
                  changedFields.push(key); // Track this field as changed
                }
              }
              // If it's an array, we could compare the array lengths or deeply
              // compare the contents if necessary
              else if (Array.isArray(oldValue)) {
                if (!_.isEqual(oldValue, newValue)) {
                  changedFields.push(key); // Track this field as changed
                }
              }
              // If it's a simple value, compare directly
              else if (oldValue !== newValue) {
                changedFields.push(key); // Track this field as changed
              }
            }
          }
        console.log("Change in fields:", changedFields)

          if (changedFields.includes('comments')){
            console.log("comments is change")
            socketService.emitToUser({type :'story-get-comment', data: dataToDeliverd , userId: story.by._id})
          }

          if (changedFields.includes('likedBy')){
            console.log("likedBy is change")
            socketService.emitToUser({type :'story-get-like', data: dataToDeliverd , userId: story.by._id})
          }
        
        res.send(updateStory)
    } catch (err) {
        console.log(`err:`, err)
        res.status(400).send(`Couldnt update story`)
    }
}