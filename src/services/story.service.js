
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

const STORAGE_KEY = 'storyDB'


export const storyService = {
    query,
    getById,
    save,
    remove,
    addCarMsg,
    getEmptyStory,
    update,
    createStories
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

async function getById(storyId) {
   let story = await storageService.get(STORAGE_KEY, storyId)
   return story
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function getEmptyStory(){
    const user =  userService.getLoggedinUser()
    const story = {
        _id: utilService.makeId(),
        txt: "",
        imgUrl: ``, 
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
           ],
        likedBy:[],
        tags: []
    }
    return story
} 

async function save(story) {
    const storyToSave = {
        ...story, _id: utilService.makeId()
    }
    const savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    console.log(savedStory)
    return savedStory
}

async function update(storyToSave){
    const stories = await query()
    const idx = stories.findIndex(story => story._id === storyToSave._id )
    stories[idx] = storyToSave
    console.log(storyToSave)
    const savedStory = await storageService.put(STORAGE_KEY, storyToSave)
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

async function createStories(){
    const users = await storageService.query('userDB')
    console.log(users)
    const stories= []
    for (var i = 0; i< 17; i++){
        stories.push(_createStory(users[utilService.getRandomIntInclusive(0,4)]))
    }
    console.log(stories)
    // utilService.saveToStorage(STORAGE_KEY, stories)
    console.log('_createStories: stories were created', stories)
    return stories
}

function _createStory(user) {
    const story = {
        _id: utilService.makeId(),
        txt: "Something to write on the post",
        // imgUrl: `src/imgs/img${utilService.getRandomIntInclusive(1,7)}.jpg`, 
        imgUrl: `https://picsum.photos/id/${utilService.getRandomIntInclusive(0,300)}/200/300`, 
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
            _id: "A197",
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








