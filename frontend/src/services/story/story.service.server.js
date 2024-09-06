import  Axios  from "axios";

const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/story' :
    '//localhost:3031/api/story'

    export const storyService ={
        query,
        getById,
        remove,
        save,
        update
    }

    async function query(filterBy ={}){
        try{
            const {data : stories} = await axios.get(BASE_URL, {params: filterBy})
            return stories
        } catch (err){
            console.log("cant get bugs", err)
        }
    }

    async function getById(storyId) {
       try {
         const{data: story} = await axios.get(BASE_URL +"/"+ storyId)
         return story
       } catch (err) {
            console.log("cant find story",storyId, err)
       }
     }

     async function remove(storyId){
        try {
            let {data :story } = await axios.delete(BASE_URL +"/"+ storyId)
            console.log("story:", storyId," is deleted")
            return story
        } catch (err) {
            console.log("Can't delete story with ID:" ,storyId)
        }
     }

     async function save(story) {
        try {
            console.log(story)
            const {data :savedStory} = await axios.post(BASE_URL, story)
            console.log(savedStory)
            return savedStory
        } catch (err) {
            console.log("Cant add story:", err)
        }
    }

    async function update(story){
        try {
            const {data: savedStory} = await axios.put(BASE_URL, story)
            return savedStory
        } catch (err) {
            console.log("Cant update story:", err)
        }
    }