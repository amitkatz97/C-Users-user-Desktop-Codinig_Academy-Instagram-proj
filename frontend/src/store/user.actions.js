import { userService } from '../services/user/index.js'
import { store } from '../store/store'

import { showErrorMsg } from '../services/event-bus.service'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, UPDATE_USER } from './user.reducer'
import { socketService } from '../services/socket.service'

export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {

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
    console.log("loggin function is activated");
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        console.log("user from actions", user)
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
        socketService.login(user)
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
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function addFollow(user, profile) {
    console.log("user:", user, "profile:", profile)
    let status
    const { followers } = profile
    const { following } = user

    // Buliding two mini users
    const myMiniUser = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
    }
    const profileMiniUser = {
        _id: profile._id,
        fullname: profile.fullname,
        imgUrl: profile.imgUrl,
    }


    const followStatus = followers.filter(userFollower => userFollower._id === user._id)
    if (followStatus.length === 0) {
        followers.push(myMiniUser)
        following.push(profileMiniUser)
        status = true
    } else {
        let indexToRemove = followers.findIndex(userFollower => userFollower._id === user._id)
        followers.splice(indexToRemove, 1)
        let userIndexToRemove = following.findIndex(userFollower => userFollower._id === profile._id)
        following.splice(userIndexToRemove, 1)
        status = false
    }
    await updateUser(profile)
    await updateUser(user)
    return status
}

export async function isUserFollowCheck(user, profile) {
    const { following } = user
    let indexToRemove = await following.findIndex(userFollower => userFollower._id === profile._id)
    if (indexToRemove > -1) { return true }
    else return false
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        // console.log('user from DB:', user)
        store.dispatch(getCmdSetUser(user))
        return user
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(user) {
    try {
        const savedUser = await userService.update(user)
        store.dispatch({ type: UPDATE_USER, user })
        return savedUser
    } catch (err) {
        showErrorMsg("Cant update user")
        console.log('Cannot update user', err)
    }
}

function getCmdSetUser(user) {
    return {
        type: SET_WATCHED_USER,
        user
    }
}