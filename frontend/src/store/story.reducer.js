export const SET_STORIES = 'SET_STORIES'
export const SET_STORY = 'SET_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_STORY_MSG = 'ADD_STORY_MSG'
export const SET_COMMENT = "SET_COMMENT"
export const SET_ALL_STORIES = "SET_ALL_STORIES"

const initialState = {
    stories: [],
    allStories: [],
    story: null,
    comment: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var stories
    var story 
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case SET_ALL_STORIES:
            newState = { ...state, allStories: action.stories }
            break
        case SET_STORY:
            newState = { ...state, story: action.story }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.stories.find(story => story._id === action.storyId)
            stories = state.stories.filter(story => story._id !== action.storyId)
            newState = { ...state, stories, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, stories: [...state.stories, action.story] }
            break
        case UPDATE_STORY:
            story = state.stories.find(story => story._id === action.story._id)
            newState = { ...state, story: action.story }
            break
        case ADD_STORY_MSG:
            newState = { ...state, story: { ...state.story, msgs: [...state.story.msgs || [], action.msg] } }
            break
        case SET_COMMENT:
            newState = {...state, comment: action.comment}
            break
        default:
    }
    return newState
}


