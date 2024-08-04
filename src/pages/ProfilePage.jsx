import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { storyService } from '../services/story.service'
import { userService } from '../services/user.service'
import { loadUser } from '../store/user.actions'
import { loadStories } from '../store/story.actions'
import { StoryPreview } from '../cmps/StoryPreview'
import Loader from '../cmps/Loader.jsx'

export function ProfilePage(){

    // const user = useSelector(userState => userState.userModule.watchedUser)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    const params = useParams()
    const [profile , setProfile] = useState()
    const [numOfStories, setNumOfStories] =useState()

    useEffect(()=>{
        Init()
        getNumOfStories()
    },[params])

    async function Init(){
        const currUser = userService.getLoggedinUser()
        console.log(currUser)
        if (params.userId === currUser._id){
            setProfile(currUser)
        }
        else {const newUser = await loadUser(params.userId)
        setProfile(newUser)
        }
    }

    async function getNumOfStories(){
        const stories = await loadStories()
        console.log(stories)
        let num_of_stories = 0
        const user_stories = await stories.map(story => {
            if (story.by._id === profile._id){
                num_of_stories += 1
            }
        })
        console.log(num_of_stories)
        setNumOfStories(num_of_stories)
    }

    async function getUserStories(){
        const userStoriesList = stories.filter(story => story.by._id === profile._id)
        console.log(userStoriesList)
        return userStoriesList
    }


    if (!profile) return <div><Loader/></div>
    return(
        <>
        <div className='user-profile'>
            <section className='user-info'>
                <img src={profile.imgUrl} alt="No picture" />
                <section className='user-data'>
                    <div className='actions'>
                        <h1>{profile.fullname}</h1>
                        <button>Message</button>
                        <button>Follow!</button>
                    </div>
                    <div className='follow'>
                        {numOfStories ? ( <div>{numOfStories}<span> Posts</span></div>):(<div>0</div>)}
                        <div>{profile.following.length} <span> Following</span></div>
                        <div>{profile.followers.length}<span> Followers</span></div>
                        <button onClick={()=> {getNumOfStories(stories)}}>jjj</button>
                    </div>
                </section>
            </section>
            <section className='user-posts'>
                <p onClick={getUserStories}>Here will be posts</p>
                {/* <StoryPreview/> */}
            </section>
        </div>
        </>    
    )
}