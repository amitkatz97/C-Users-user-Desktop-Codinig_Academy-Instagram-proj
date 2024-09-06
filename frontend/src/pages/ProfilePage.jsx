import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link ,Outlet ,NavLink, useNavigate} from 'react-router-dom'
import { storyService } from '../services/story/index.js'
import { userService } from '../services/user/index.js'
import { loadUser } from '../store/user.actions'
import { loadStories } from '../store/story.actions'
import { StoryPreview } from '../cmps/StoryPreview'
import Loader from '../cmps/Loader.jsx'
import { UserStories } from '../cmps/userStories.jsx'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


export function ProfilePage(){

    const user = useSelector(userState => userState.userModule.watchedUser)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    const params = useParams()
    const navigate = useNavigate()
    const [profile , setProfile] = useState()
    const [userStories, setUserStories]= useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        updateStories()
    },[profile])

    useEffect(()=>{
        Init()
    },[params])

   

    async function updateStories() {
        await getUserStories()
        console.log("Profile from updateStories",profile)
        setIsLoading(false)
    }

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

    async function getUserStories(){
        const userStoriesList = await stories.filter(story => story.by._id === profile._id)
        console.log("user stories list: ",userStoriesList)
        setUserStories(userStoriesList)
        return userStoriesList
    }

    function navigateToDetailes(adress){
        navigate(`/${profile._id}/${adress}`)
    }


    if (isLoading) return <div><Loader/></div>
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
                        {userStories ? ( <div>{userStories.length}<span> Posts</span></div>):(<div>0</div>)}
                        <div>{profile.following.length} <span> Following</span></div>
                        <div>{profile.followers.length}<span> Followers</span></div>
                    </div>
                </section>
            </section>
            <section className='user-posts'>
                <section className='user-story-links'>
                    <NavLink> Posts</NavLink>
                    <NavLink> <BookmarkBorderIcon fontSize='small'/> Saved</NavLink>
                </section>
                <section className='user-story-posts'>
                {userStories.map(story =>
                    <li key={story._id}>
                         <UserStories story ={story} profile ={profile} navigateToDetailes ={navigateToDetailes}/>
                    </li>
                  
                )}
                 </section>
                 <Outlet/>
            </section>
        </div>
        </>    
    )
}