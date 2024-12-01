import { utilService } from '../util.service';
// import { socketService } from '../socket.service'
import Axios from "axios";


const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api' :
    '//localhost:3031/api'

const USER_URL = `${BASE_URL}/user`
const AUTH_URL = `${BASE_URL}/auth`

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    // remove,
    update,
    getUsersByFollowing
}

console.log("remote mode")

async function getUsers(filterBy) {
    try {
        const { data: users } = await axios.get(USER_URL)
        // console.log(users)
        return users
    } catch (err) {
        console.log("Can't gat users".err)
    }
}

async function getUsersByFollowing(userId) {
    try {
        const { data: users } = await axios.get(USER_URL + "/follow/" + userId)
        return users
    } catch (err) {
        console.log("Can't gat users by Foloowing".err)
    }
}

async function getById(userId) {
    try {
        const { data: user } = await axios.get(USER_URL + "/" + userId)
        return user
    } catch (err) {
        console.log("doesnt find user with ID:", userId)
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, following: user.following, followers: user.followers }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function login(userCred) {
    try {
        const { data: user } = await axios.post(AUTH_URL + '/login', userCred)
        //  const user = await users.find(user => user.fullname === userCred.fullname)
        // const user = await httpService.post('auth/login', userCred)
        if (user) saveLocalUser(user)
        return user
    } catch (err) {
        console.log("cant logged in", err)
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await axios.post(AUTH_URL+'/signup', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function update(user) {
    try {
        const { data: savedUser } = await axios.put(USER_URL, user)
        return savedUser
    } catch (err) {
        console.log("Cant update user,", err)
    }

}