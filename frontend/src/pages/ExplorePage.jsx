import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { storyService } from '../services/story/index.js'
import { UserStories } from '../cmps/userStories.jsx'
import Loader from '../cmps/Loader.jsx'


export function ExplorePage(){
    // const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(userState => userState.userModule.user)

    const [stories, setStories]= useState([])

    useEffect(()=>{
        Init()
        console.log(stories)
    },[])

    const navigate = useNavigate()

    async function Init(){
        try {
            const storiesToExplore = await storyService.queryOnlyUnfollowing(user._id)
            setStories(storiesToExplore)
        } catch (err) {
            console.log("Cant get stories to explore", err)
        }
    }

    function navigateToDetailes(adress){
        navigate(`/explore/${adress}`)
    }
    if (!stories) return <div><Loader/></div>
    return(
        <>
        <ul className='explore'>
        {stories.map(story =>
            <li key={story._id}>
                 <UserStories story ={story} navigateToDetailes={navigateToDetailes}/>
            </li>
          
        )}
        </ul>
        <Outlet/>
        </>
    )
}