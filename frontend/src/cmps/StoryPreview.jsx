import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { CommentAdding } from "./CommentAdding";
import { CommentIcon } from "./SVG.jsx";
import { SaveIcon, NotificationIcon, NotificationIconRed , MessageIcon} from "./SVG.jsx"
import Loader from '../cmps/Loader.jsx'
import BasicModal from "../cmps/Modal.jsx"
import { UserMiniCard } from "./UserMiniCard.jsx";









export function StoryPreview({ story , onLike}) {
    const user = useSelector(userState => userState.userModule.user)
    const storeStory = useSelector(storeState => storeState.storyModule.story)
    const navigate = useNavigate()
    const [isUserLike, setIsUserLike] = useState()

    useEffect(() => {
        isUserLikeCheck1()
        console.log("story preview is rendering")
    }, [])

    function isUserLikeCheck1() {
        // console.log("is user like check is active")
        const { likedBy } = story
        let indexToRemove = likedBy.findIndex(userLike => userLike._id === user._id)
        if (indexToRemove < 0) { setIsUserLike(false) }
        else setIsUserLike(true)
    }
     async function onLikeClicked(story){
        setIsUserLike(!isUserLike)
        onLike(story)
     }
    
 

    

    if (!story) return <div><Loader/></div>
    return (
        <div className="story-preview">

            <Link to={`/${story.by._id}`}>
                <article className="header">
                    <img src={story.by.imgUrl} alt="" />
                    {story.by.fullname}
                </article>
            </Link>
            <img src={story.imgUrl} />
            <div className="action-panel">
                {/* {like(story)} */}
                {isUserLike ? (
                    <button onClick={() => { onLikeClicked(story) }}><NotificationIconRed /></button>) :
                    (<button onClick={() => { onLikeClicked(story) }}><NotificationIcon /></button>)
                }
                <button onClick={() => navigate(`/home/${story._id}`)}><CommentIcon /></button>
                <button><MessageIcon /></button>
                <button className="bookmark"><SaveIcon /></button>
            </div>
            <div>
                <div className="likes-amount"> 
                <BasicModal header ={`${story.likedBy.length} Likes`} text ={"Likes"} content={story.likedBy.map(user =>
                    <li style={{listStyle : 'none'}} key={story._id}>
                        <UserMiniCard user ={user} fromHome = {false} isMiniUser = {true}/>
                    </li>
                )}/>
                </div>
                <div className="story-description">
                    <span>{story.by.fullname}</span>
                    : {story.txt}

                    <section className="comment-panel">
                        <Link to={`/home/${story._id}`}>View all {story.comments.length} comments</Link>
                        <CommentAdding story={story} user={user} />
                    </section>
                </div>
            </div>
            {/* <button onClick={()=> {removeStory(story.id)}}>Remove</button>
                    <button onClick={()=> {updateStory()}}>Edit</button> */}

        </div>

    )
}