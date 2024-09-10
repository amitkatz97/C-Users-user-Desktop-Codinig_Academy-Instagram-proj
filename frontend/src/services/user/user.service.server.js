import { utilService } from '../util.service'
import  Axios  from "axios";

const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/user' :
    '//localhost:3031/api/user'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    // login,
    logout,
    // signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    // remove,
    // update,
}

async function getUsers(filterBy){
    try {
        const {data : users} = await axios.get(BASE_URL)
        console.log(users)
        return users
    } catch (err) {
        console.log("Can't gat users". err)
    }
}

async function getById(userId){
    try {
        const {data : user} = await axios.get(BASE_URL + "/" + userId)
        return user
    } catch (err) {
        console.log("doesnt find user with ID:", userId)
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl,following: user.following, followers: user.followers}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}