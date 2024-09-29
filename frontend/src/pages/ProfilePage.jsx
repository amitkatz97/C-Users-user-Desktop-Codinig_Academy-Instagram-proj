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
import BasicModal from '../cmps/Modal.jsx'
import { UserMiniCard } from "../cmps/UserMiniCard.jsx";


export function ProfilePage(){
    
    const user = useSelector(userState => userState.userModule.user)
    const watchedUser = useSelector(userState => userState.userModule.watchedUser)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    const params = useParams()
    const navigate = useNavigate()
    // const [watchedUser , setProfile] = useState()
    const [userStories, setUserStories]= useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isFollow, setIsFollow] = useState(false)

    useEffect(()=>{
        Init()
    },[params])

    useEffect(()=>{
        console.log(watchedUser)
        updateStories()
    },[watchedUser])


    useEffect(()=> {
        setTimeout(() => {
            setIsFollow(isUserFollowCheck(user, watchedUser)) 
        }, 100);
    },[watchedUser])

   

    async function updateStories() {
        await getUserStories()
        setIsLoading(false)
    }

    async function Init(){
            await loadUser(params.userId)
            // await getUserStories()
            // const status = await isUserFollowCheck((user, watchedUser))
            // setIsFollow(status)
            // setIsLoading(false)
        // if (params.userId === user._id){
        //     setProfile(user)
        // }
        // else {const newUser = await loadUser(params.userId)
        // setProfile(newUser)
        // }
        // console.log( "watchedUser:", watchedUser)
    }

    async function getUserStories(){
        const userStoriesList = await stories.filter(story => story.by._id === watchedUser._id)
        setUserStories(userStoriesList)
        return userStoriesList
    }

    function navigateToDetailes(adress){
        navigate(`/${watchedUser._id}/${adress}`)
    }

    async function onFollow(){
        console.log(watchedUser)
        const followStatus = await addFollow(user ,watchedUser)
        setIsFollow(followStatus)
    }


    if (isLoading) return <div><Loader/></div>
    return(
        <>
        <div className='user-profile'>
            <section className='user-info'>
                <img src={watchedUser.imgUrl} alt="No picture" />
                <section className='user-data'>
                    <div className='actions'>
                        {user._id === watchedUser._id?(
                            <>
                            <h1>{watchedUser.fullname}</h1>
                            <button>Edit Profile</button>
                            <button>View archive</button>
                            <div><ProfileSettings/></div>
                            </>
                        ):(
                            <>
                            <h1>{watchedUser.fullname}</h1>
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
                        <div><BasicModal header={` followers`} number={watchedUser.followers.length} text = {"Followers"} content={watchedUser.followers.map(user =>
                            <li style={{listStyle : 'none'}}>
                                <UserMiniCard user ={user} fromHome={false}/>
                            </li>
                         )}/> 
                        </div>
                        <div><BasicModal header={` following`} number={watchedUser.following.length} text = {"Following"} content={watchedUser.following.map(user =>
                            <li style={{listStyle : 'none'}}>
                                <UserMiniCard user ={user} fromHome={false}/>
                            </li>
                         )}/> 
                         </div>
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
                         <UserStories story ={story} watchedUser ={watchedUser} navigateToDetailes ={navigateToDetailes}/>
                    </li>
                  
                )}
                 </section>
                 <Outlet/>
            </section>
        </div>
        </>    
    )
}