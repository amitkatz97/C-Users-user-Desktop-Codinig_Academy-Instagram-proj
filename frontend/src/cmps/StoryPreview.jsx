import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { loadStories, addStory, removeStory, updateStory, isUserLikeCheck } from "../store/story.actions"
import { utilService } from "../services/util.service";
import { Accordion } from "./Accordion";
import { CommentAdding } from "./CommentAdding";
import { CommentIcon } from "./SVG.jsx";
import { SaveIcon, NotificationIcon, NotificationIconRed , MessageIcon} from "./SVG.jsx"
import Loader from '../cmps/Loader.jsx'
import BasicModal from "../cmps/Modal.jsx"
import { UserMiniCard } from "./UserMiniCard.jsx";







export function StoryPreview({ story, onLike }) {
    const user = useSelector(userState => userState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const navigate = useNavigate()
    const [isUserLike, setIsUserLike] = useState(false)

    useEffect(() => {
        console.log("Story preview is rendering")
        isUserLikeCheck1(story)
    }, [isUserLike, stories])

    function isUserLikeCheck1(story) {
        const { likedBy } = story
        let indexToRemove = likedBy.findIndex(userLike => userLike._id === user._id)
        if (indexToRemove < 0) { setIsUserLike(false) }
        else setIsUserLike(true)
    }

    if (!stories) return <div><Loader/></div>
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
                    <button onClick={() => { onLike(story) }}><NotificationIconRed /></button>) :
                    (<button onClick={() => { onLike(story) }}><NotificationIcon /></button>)
                }
                <button onClick={() => navigate(`/p/${story._id}`)}><CommentIcon /></button>
                <button><MessageIcon /></button>
                <button className="bookmark"><SaveIcon /></button>
            </div>
            <div>
                <div className="likes-amount"> 
                <BasicModal header ={`${story.likedBy.length} Likes`} text ={"Likes"} content={story.likedBy.map(user =>
                    <li style={{listStyle : 'none'}}>
                        <UserMiniCard user ={user} fromHome = {false}/>
                    </li>
                )}/>
                </div>
                <div className="story-description">
                    <span>{story.by.fullname}</span>
                    : {story.txt}

                    <section className="comment-panel">
                        <Link to={`/p/${story._id}`}>View all {story.comments.length} comments</Link>
                        <CommentAdding story={story} user={user} />
                    </section>
                </div>
            </div>
            {/* <button onClick={()=> {removeStory(story.id)}}>Remove</button>
                    <button onClick={()=> {updateStory()}}>Edit</button> */}

        </div>

    )
}