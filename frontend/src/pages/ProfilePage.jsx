import { useEffect, useState } from 'react'
import { Await, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link ,Outlet ,NavLink, useNavigate} from 'react-router-dom'
import { userService } from '../services/user/index.js'
import { addFollow, loadUser , isUserFollowCheck } from '../store/user.actions'
import Loader from '../cmps/Loader.jsx'
import { UserStories } from '../cmps/userStories.jsx'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { ProfileSettings } from '../cmps/SVG.jsx'


export function ProfilePage(){
    
    const user = useSelector(userState => userState.userModule.user)
    const watchedUser = useSelector(userState => userState.userModule.watchedUser)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    const params = useParams()
    const navigate = useNavigate()
    const [profile , setProfile] = useState()
    const [userStories, setUserStories]= useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isFollow, setIsFollow] = useState(false)

    useEffect(()=>{
        Init()
    },[params])

    useEffect(()=>{
        updateStories()
    },[profile])


    useEffect(()=> {
        setTimeout(() => {
            setIsFollow(isUserFollowCheck(user, profile)) 
        }, 1000);
    },[profile])

   

    async function updateStories() {
        await getUserStories()
        setIsLoading(false)
    }

    async function Init(){
        if (params.userId === user._id){
            setProfile(user)
        }
        else {const newUser = await loadUser(params.userId)
        setProfile(newUser)
        }
        console.log( "profile:", profile)

    }

    async function getUserStories(){
        const userStoriesList = await stories.filter(story => story.by._id === profile._id)
        setUserStories(userStoriesList)
        return userStoriesList
    }

    function navigateToDetailes(adress){
        navigate(`/${profile._id}/${adress}`)
    }

    async function onFollow(){
        console.log(watchedUser)
        const followStatus = await addFollow(user ,profile)
        setIsFollow(followStatus)
    }


    if (isLoading) return <div><Loader/></div>
    return(
        <>
        <div className='user-profile'>
            <section className='user-info'>
                <img src={profile.imgUrl} alt="No picture" />
                <section className='user-data'>
                    <div className='actions'>
                        {user._id === profile._id?(
                            <>
                            <h1>{profile.fullname}</h1>
                            <button>Edit Profile</button>
                            <button>View archive</button>
                            <div><ProfileSettings/></div>
                            </>
                        ):(
                            <>
                            <h1>{profile.fullname}</h1>
                            {isFollow?(
                            <button onClick={onFollow}>Following</button>
                            ):(<button className= 'follow' onClick={onFollow}>Follow</button>)
                            }
                            <button>Message</button>
                            </>
                        )}
                        
                        
                    </div>
                    <div className='follow'>
                        {userStories ? ( <div>{userStories.length}<span> posts</span></div>):(<div>0</div>)}
                        <div>{profile.followers.length}<span> followers</span></div>
                        <div>{profile.following.length} <span> following</span></div>
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