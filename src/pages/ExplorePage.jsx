import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { storyService } from '../services/story.service'
import { UserStories } from '../cmps/userStories.jsx'
import Loader from '../cmps/Loader.jsx'


export function ExplorePage(){
    const stories = useSelector(storeState => storeState.storyModule.stories)

    useEffect(()=>{
        console.log(stories)
    },[])

    const navigate = useNavigate()

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