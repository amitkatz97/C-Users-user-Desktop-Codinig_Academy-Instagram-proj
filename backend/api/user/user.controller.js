import { loggerService } from "../../services/logger.service.js";
import { UserService } from "./user.service.js";
import { socketService } from '../../services/socket.service.js';
import { authService } from '../auth/auth.service.js'



export async function getUsers(req, res){
    try {
        const users = await UserService.query()
        res.send(users)
    } catch (err) {
        console.log('Couldent gat users', err)
        res.status(400).send("Couldnt get users")
    }
}

export async function getUsersByFollowing( req, res){
    const {userId } = req.params
    try {
        const users = await UserService.queryByFollowing(userId)
        res.send(users)
    } catch (err) {
        console.log('Couldent gat users', err)
        res.status(400).send("Couldnt get users")
    }
}

export async function getUser(req, res){
    const {userId } = req.params
    try {
        const user = await UserService.getById(userId)
        res.send(user)
    } catch (err) {
        console.log(`couldnt find user with id ${userId}`, err)
        res.status(401).send("user not find")
    }
}

export async function addUser(req, res){
    const { fullname , imgUrl } = req.body
    const userToSave = {fullname, imgUrl, following : [], followers: []}
    try {
        const savedUser = await UserService.add(userToSave)
        res.send(savedUser)
        loggerService.info(" User Saved succffuly")
    } catch (error) {
        console.log(error)
        res.status(400).send("Couldnt save user")
    }
}

export async function updateUser(req, res){
    const {followers, following, _id} = req.body
    const userToSave = {followers, following, _id}
    const currentUser = await UserService.getById(_id)
    var { loginToken } = req.cookies
    try {
        const loggedinUser = authService.validateToken(loginToken)
        // console.log("current user followers",currentUser.followers.length)
        // console.log("saved user last follower",userToSave.followers.at[-1])
        const savedUser = await UserService.update(userToSave)
         
        if (currentUser.followers.length < userToSave.followers.length){
            const lastFollower = Object.values(userToSave.followers).pop()
            // console.log("lastfollower:",lastFollower)
            socketService.emitToUser({type :'user-get-follow', data: lastFollower , userId: userToSave._id})
        }
        res.send(savedUser)
        loggerService.info(" User updated succffuly")
    } catch (err) {
        loggerService.error("Cant update user", err)
        res.status(400).send("Couldnt update user")
    }
}