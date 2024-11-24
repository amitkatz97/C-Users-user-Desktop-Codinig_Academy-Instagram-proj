import { loggerService } from "../../services/logger.service.js";
import { ObjectId } from "mongodb";



import fs from "fs";
import { dbService } from "../../services/db.service.js";


export const StoryService = {
    query,
    getById,
    remove,
    add,
    update,
    queryByFollowing,
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const sort = _buildSort(filterBy)

        const collection = await dbService.getCollection("story_ex")
        var storyCursor = await collection.find(criteria).sort({"_id": -1})

        const stories = await storyCursor.toArray()
        return stories
    } catch (err) {
        loggerService.error("cant find stories", err)
        throw err
    }
}

async function queryByFollowing(userId, explore = false) {
    console.log("User Id from front:", userId)
    console.log("explore from service",explore)
    try {
        const criteria = { _id: ObjectId.createFromHexString(userId) }
        const Ecriteria = {}

        const users = await dbService.getCollection("user")
        const user = await users.findOne(criteria)
        if (!user) {
            throw new Error("User not found")
        }

        const followingIds = user.following.map(follow => follow._id)
        followingIds.push(ObjectId.createFromHexString(userId))

        const storiesCollection = await dbService.getCollection("story_ex")
        if (explore){
            var storyCursor = await storiesCollection.find({ 'by._id': { $nin: followingIds } }).sort({"_id": -1})
        }else {
            var storyCursor = await storiesCollection.find({ 'by._id': { $in: followingIds } }).sort({"_id": -1})
        }
        const results = await storyCursor.toArray()

        return results;

    } catch (err) {
        console.error('Error fetching stories:', err);
        throw err
    }
}


async function getById(storyId) {
    try {
        const criteria = { _id: ObjectId.createFromHexString(storyId) }

        const collection = await dbService.getCollection("story_ex")
        const story = await collection.findOne(criteria)
        return story
    } catch (err) {
        loggerService.error("couldnt find story with ID:", storyId, err)
        throw err
    }
}

async function remove(storyId) {
    try {
        const criteria = { _id: ObjectId.createFromHexString(storyId) }

        const collection = await dbService.getCollection("story_ex")
        const res = await collection.deleteOne(criteria)
        loggerService.warn(`bug with id ${storyId} is deleted`)
        return storyId
    } catch (err) {
        loggerService.error("Couldn't remove story with id:", storyId, err)
        throw err
    }
}

async function add(story) {
    console.log(story)
    const newBy = {...story.by, _id :ObjectId.createFromHexString(story.by._id) }
    const storyToSave= {...story, by : newBy}
    try {
        
        const collection = await dbService.getCollection("story_ex")
        await collection.insertOne(storyToSave)

        return storyToSave
    } catch (err) {
        loggerService.error("Couldn't add story ", err)
        throw err
    }
}

async function update(story) {
    const storyToUpdate = { likedBy: story.likedBy, comments: story.comments }
    try {
        const criteria = { _id: ObjectId.createFromHexString(story._id) }
        const collection = await dbService.getCollection("story_ex")

        await collection.updateOne(criteria, { $set: storyToUpdate })
    } catch (err) {
        loggerService.error("Cannot update story with id", story._id)
        throw err
    }
}





function _buildCriteria(filterBy) {
    const criteria = {
        // title: {$regex: filterBy.title },
        // severity: {$gte: filterBy.severity},
        // labels: {$regex: filterBy.labels}
    }
    return criteria
}

function _buildSort({ sortBy }) {
    if (!sortBy) return {}
    return { [sortBy.by]: sortBy.dir }
}