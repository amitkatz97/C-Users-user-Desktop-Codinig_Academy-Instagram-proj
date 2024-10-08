import { userService } from '../services/user/index.js'
// import { socketService } from '../services/socket.service'
import { store } from '../store/store'

import { showErrorMsg } from '../services/event-bus.service'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, UPDATE_USER } from './user.reducer'

export async function loadUsers() {
    try {
        // store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        // store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function addFollow(user, profile){
    console.log("user:", user, "profile:", profile)
    let status
    const {followers} = profile 
    const {following} = user

    // Buliding two mini users
    const myMiniUser = {
        _id: user._id,
        fullname :user.fullname,
        imgUrl: user.imgUrl,
    }
    const profileMiniUser = {
        _id: profile._id,
        fullname :profile.fullname,
        imgUrl: profile.imgUrl,
    }


    let followStatus = followers.filter(userFollower => userFollower._id === user._id)
    if (followStatus.length === 0){
        followers.push(myMiniUser)
        following.push(profileMiniUser)
        status = true
    } else {
        let indexToRemove= followers.findIndex(userFollower => userFollower._id === user._id)
        followers.splice(indexToRemove, 1)
        let userIndexToRemove= following.findIndex(userFollower => userFollower._id === profile._id)
        following.splice(userIndexToRemove, 1)
        status = false
    }
    await updateUser(profile)
    await updateUser(user)
    return status
}

export function isUserFollowCheck(user, profile){
    console.log("is user chack is activated")
    const {following} = user 
    // console.log("CurrUser following on" , following)
    let indexToRemove= following.findIndex(userFollower => userFollower._id === profile._id)
    if (indexToRemove < 0 ) 
        { return false }
    else return true
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
        return user
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(user){
    try {
        const savedUser = await userService.update(user)
        store.dispatch({ type: UPDATE_USER, user })
        return savedUser
    } catch (err) {
        showErrorMsg("Cant update user")
        console.log('Cannot update user', err)
    }
}