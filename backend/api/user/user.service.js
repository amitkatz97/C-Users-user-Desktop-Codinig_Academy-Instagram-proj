import { ObjectId } from "mongodb";
import { loggerService } from "../../services/logger.service.js";

import fs from "fs";
import { dbService } from "../../services/db.service.js";


export const UserService = {
    query,
    getById,
    // save,
    // remove,
    update,
    add,
    queryByFollowing,
    getByFullname
}

async function query(filterBy ={}){
    const {sortBy, ...rest} = filterBy

    try {
        const criteria =_buildCriteria(filterBy)
        const sort = _buildSort(filterBy)

        const collection = await dbService.getCollection('user')
        var userCursor = await collection.find(criteria, {sort})

        let usersToDisplay = await userCursor.toArray()
        return usersToDisplay
    } catch (err) {
        loggerService.error("Couldnt get users", err)
        throw err
    }
}

async function queryByFollowing(userId){
    try {
        const criteria = { _id: ObjectId.createFromHexString(userId) }

        const users = await dbService.getCollection("user")
        const user = await users.findOne(criteria)
        if (!user) {
            throw new Error("User not found")
        }

        const followingIds = user.following.map(follow => follow._id)
        followingIds.push(ObjectId.createFromHexString(userId))

        var userCursor = await users.find({ '_id': { $nin: followingIds } })

        const results = await userCursor.toArray()
        loggerService.info("query by Following succeded")
        return results
    } catch (err){
        console.log("Cant getusers by Following", err)
        throw err
    }
}

async function getById(userId){
    try {
        const criteria = {_id: ObjectId.createFromHexString(userId)}
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne(criteria)
        return user
    } catch (err) {
        loggerService.error(`Couldnt find user with Id ${userId}`, err)
        throw err
    }
}

async function update(user){
    console.log("user:",user)
    const {following , followers} = user
    const updateFollowing = following.map(Object =>({
                _id: typeof Object._id === 'string' ? ObjectId.createFromHexString(Object._id) : Object._id,
                fullname: Object.fullname,
                imgUrl: Object.imgUrl
    }))

    const updateFollowers = followers.map(Object =>({
        _id: typeof Object._id === 'string' ? ObjectId.createFromHexString(Object._id) : Object._id,
        fullname: Object.fullname,
        imgUrl: Object.imgUrl
}))


    const userToUpdate = {following: updateFollowing, followers: updateFollowers}

    try {
        const criteria = { _id: ObjectId.createFromHexString(user._id) }
        const collection = await dbService.getCollection("user")

        await collection.updateOne(criteria, {$set : userToUpdate})
    } catch (err) {
        loggerService.error("Cannot update user with id", user._id)
        throw err
    }

}

async function add(user){
    try {
        const userTosave = {...user, following:[], followers:[]}
        const collection = await dbService.getCollection("user")
        const savedUser = await collection.insertOne(userTosave)

        return savedUser
    } catch (err) {
        loggerService.error("Couldn't add user " ,err)
        throw err
    }
}




function _buildCriteria(filterBy){
    const criteria ={ 
    }
    return criteria
}

function _buildSort({sortBy}){
    if (!sortBy) return {}
    return { [sortBy.by]: sortBy.dir}
}

async function getByFullname(fullname){
    try {
        const criteria = {fullname: fullname}
        const collection = await dbService.getCollection('user')

        const user = await collection.findOne(criteria)
        // if(!user) throw `Couldnt find user with Id ${userId}`
        return user
    } catch (err) {
        loggerService.error(`Couldnt find user with username ${username}`, err)
        throw err
    }
}