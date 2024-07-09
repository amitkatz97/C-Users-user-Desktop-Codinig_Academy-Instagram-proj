export const SET_STORIES = 'SET_STORIES'
export const SET_STORY = 'SET_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_STORY_MSG = 'ADD_STORY_MSG'

const initialState = {
    stories: [],
    story: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var stories
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
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
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, stories }
            break
        case ADD_STORY_MSG:
            newState = { ...state, story: { ...state.story, msgs: [...state.story.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const car1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }
    const car2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }

    state = storyReducer(state, { type: SET_CARS, cars: [car1] })
    console.log('After SET_CARS:', state)

    state = storyReducer(state, { type: ADD_CAR, car: car2 })
    console.log('After ADD_CAR:', state)

    state = storyReducer(state, { type: UPDATE_CAR, car: { ...car2, vendor: 'Good' } })
    console.log('After UPDATE_CAR:', state)

    state = storyReducer(state, { type: REMOVE_CAR, carId: car2._id })
    console.log('After REMOVE_CAR:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = storyReducer(state, { type: ADD_CAR_MSG, carId: car1._id, msg })
    console.log('After ADD_CAR_MSG:', state)

    state = storyReducer(state, { type: REMOVE_CAR, carId: car1._id })
    console.log('After REMOVE_CAR:', state)
}

