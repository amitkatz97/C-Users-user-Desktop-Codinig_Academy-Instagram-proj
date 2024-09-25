import { storyService } from '../services/story/index.js'
import { utilService } from '../services/util.service.js'
import { store } from './store.js'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY, ADD_STORY_MSG , SET_COMMENT} from './story.reducer.js'



// createStories()
// fill the local storage with randomly generated stories
async function createStories() {
    try {
        const stories = await storyService.query()
        if (!stories || stories.length === 0) {
            console.log('create stories now')
            // get an array of randomly-generated stories
            const newStories = await storyService.createStories()
            // add each of these stories through redux (storage + store)
            for (const newStory of newStories) {
                await addStory(newStory)
            }
        }
    } catch (err) {
        console.log('Cannot load stories', err)
    }
}


export async function loadStories(user) {
    const {_id} = user
    try {
        const stories = await storyService.queryOnlyFollowing(_id)
        console.log('stories from DB:', stories)
        store.dispatch(getCmdSetStories(stories))
        return stories
    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function loadStory(storyId) {
    try {
        const story = await storyService.getById(storyId)
        console.log('Story from DB:', story)
        store.dispatch(getCmdSetStory(story))
        return story
    } catch (err) {
        console.log('Cannot load story', err)
        throw err
    }
}


export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    store.dispatch(getCmdAddStory(story))
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        return savedStory
    } catch (err) {
        console.log('Cannot add Story', err)
        store.dispatch(getCmdRemoveStory(story._id))
        throw err
    }
}

export async function updateStory(story, comment) {
    try {
        const savedStory = await storyService.update(story)
        console.log('Updated Story:', savedStory)
        store.dispatch(getCmdUpdateStory(savedStory))
        store.dispatch(getCmdSetComment(comment))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function addCarMsg(storyId, txt) {
    try {
        const msg = await storyService.addCarMsg(storyId, txt)
        console.log('Added Car message', msg)
        store.dispatch(getCmdAddCarMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add car msg', err)
        throw err
    }
}

export async function addLike(story, user){
    const {likedBy}= story 
    let isUserLike
        let likeStatus = likedBy.filter(userLike => userLike._id === user._id)
        if(likeStatus.length === 0){
        likedBy.push(
            {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            }
        ),isUserLike = true }  else {
            let indexToRemove= likedBy.findIndex(userLike => userLike._id === user._id)
            likedBy.splice(indexToRemove, 1)
            isUserLike = false
        }
        updateStory(story)
        return isUserLike
}

export async function addCommentLike( story ,comment, user){
    const {likedBy} = comment
    console.log (comment)
    console.log (likedBy)
    
    let isUserLikeComment
        let likeStatus = likedBy.filter(userLike => userLike._id === user._id)
        if(likeStatus.length === 0){
        likedBy.push(
            {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            }
        ),isUserLikeComment = true }  else {
            let indexToRemove= likedBy.findIndex(userLike => userLike._id === user._id)
            likedBy.splice(indexToRemove, 1)
            isUserLikeComment = false
        }
        updateStory(story, comment)
        return isUserLikeComment
}

export async function addComment(story, user, input){
    const {comments} = story
    comments.push(
        {
            id: utilService.makeId(),
            by:{
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            },
            txt: input,
            likedBy: []
        }
    )
    updateStory(story)
}

export function isUserLikeCheck(story, user){
    const {likedBy} = story
    let indexToRemove= likedBy.findIndex(userLike => userLike._id === user._id)
    if (indexToRemove < 0 ) 
        { return false }
    else return true
}

// Command Creators:
function getCmdSetStories(stories) {
    return {
        type: SET_STORIES,
        stories
    }
}
function getCmdSetStory(story) {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
function getCmdAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
function getCmdUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}
function getCmdAddCarMsg(msg) {
    return {
        type: ADD_CAR_MSG,
        msg
    }
}

function getCmdSetComment(comment) {
    return {
        type: SET_COMMENT,
        comment
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadCars()
    await addCar(carService.getEmptyCar())
    await updateCar({
        _id: 'm1oC7',
        title: 'Car-Good',
    })
    await removeCar('m1oC7')
    // TODO unit test addCarMsg
}
