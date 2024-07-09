
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

const STORAGE_KEY = 'storyDB'


export const storyService = {
    query,
    getById,
    save,
    remove,
    addCarMsg
}

Init()

async function Init(){
  await _createStories()
}

async function query() {
    var stories = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stories = stories.filter(story => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     stories = stories.filter(story => car.price <= filterBy.price)
    // }
    
    // Return just preview info about the boards
    // stories = stories.map(({ _id, vendor, price, owner }) => ({ _id, vendor, price, owner }))
    return stories
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    var savedStory
    if (story._id) {
        const storyToSave = {...story,
            _id : story._id,
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        // Later, owner is set by the backend
        const storyToSave = {
            txt : story.txt,
            imgURL : story.imgURL,
            by: story.by,
            comments: [],
            likedBy: []
        }
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}



async function addCarMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}

async function _createStories(){
    const users = await storageService.query('userDB')
    console.log(users)
    const stories= []
    for (var i = 0; i< 3; i++){
        stories.push(_createStory(users[i]))
    }
    console.log(stories)
    utilService.saveToStorage(STORAGE_KEY, stories)
}

function _createStory(user) {
    const story = {
        _id: utilService.makeId(),
        txt: "Something to write on the post",
        imgUrl: `src/imgs/img${utilService.getRandomIntInclusive(1,7)}.jpg`, 
        by: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        },
        loc: { // Optional
            lat: 11.11, 
            lng: 22.22,
            name: "Tel Aviv"
        },
        comments: [
            {
            id: "c1001",
            by: {
                _id: "u105",
                fullname: "Bob",
                imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
            {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img"
            }
            ]
         },
         {
            id: "c1004",
            by: {
                _id: "u106",
                fullname: "Ron",
                imgUrl: "http://some-img"
            },
            txt: "Very Nice!",
         }
        ],
        likedBy: [
            {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img"
            },
            {
            _id: "u106",
            fullname: "Ronny",
            imgUrl: "http://some-img"
            },
           ],
        tags: ["fun", "romantic"]
    } 
    return story
}








