import { userService } from "../user/index.js";
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
        update,
        getEmptyStory,
        queryOnlyFollowing,
        queryOnlyUnfollowing
    }

    async function query(filterBy ={}){
        try{
            const {data : stories} = await axios.get(BASE_URL, {params: filterBy})
            return stories
        } catch (err){
            console.log("cant get stories", err)
        }
    }

    async function queryOnlyFollowing(userId){
        try {
            const {data: stories}= await axios.get(BASE_URL+'/follow/'+ userId)
            return stories
        } catch (err) {
            console.log("cant get stories", err)
        }
    }

    async function queryOnlyUnfollowing(userId){
        try {
            const {data: stories}= await axios.get(BASE_URL+'/unfollow/'+ userId)
            return stories
        } catch (err) {
            console.log("cant get stories", err)
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

    async function getEmptyStory(){
        const user =  userService.getLoggedinUser()
        console.log("youre using get empty story function")
        const story = {
            // _id: utilService.makeId(),
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