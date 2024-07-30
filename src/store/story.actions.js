import { storyService } from '../services/story.service.js'
import { store } from './store.js'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY, ADD_STORY_MSG } from './story.reducer.js'

export async function loadStories() {
    try {
        const stories = await storyService.query()
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
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getCmdAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add Story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Updated Story:', savedStory)
        store.dispatch(getCmdUpdateStory(savedStory))
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
