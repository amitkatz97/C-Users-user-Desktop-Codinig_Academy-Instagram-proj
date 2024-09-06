import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { loadStories , addStory ,removeStory , updateStory ,isUserLikeCheck} from "../store/story.actions"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { utilService } from "../services/util.service";
import { Accordion } from "./Accordion";
import { CommentAdding } from "./CommentAdding";

export function StoryPreview({story, onLike}){
    const user = useSelector(userState => userState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const navigate = useNavigate()
    const [isUserLike, setIsUserLike] = useState(false)

    useEffect(() =>{
        isUserLikeCheck1(story)
    },[isUserLike, stories])

    function isUserLikeCheck1(story){
        const {likedBy} = story
        let indexToRemove= likedBy.findIndex(userLike => userLike._id === user._id)
        if (indexToRemove < 0 ) 
            { setIsUserLike(false) }
        else setIsUserLike(true)
    }

    if (!stories) return <div>loading...</div>
    return (
        <div className="story-preview">

            <Link to={`/${story.by._id}`}>
                    <article className="header">
                        <img src={story.by.imgUrl} alt="" />
                        {story.by.fullname} 
                    </article>
            </Link>
                    <img src= {story.imgUrl}/>
                    <div className="action-panel">
                        {/* {like(story)} */}
                        {isUserLike ? (
                        <button onClick={()=> {onLike(story)}}><FavoriteOutlinedIcon className="icon"/></button>) : 
                        ( <button onClick={()=> {onLike(story)}}><FavoriteBorderOutlinedIcon/></button>)
                        }
                        <button onClick={()=> navigate(`/p/${story._id}`)}><ModeCommentOutlinedIcon/></button>
                        <button><NearMeOutlinedIcon/></button>
                    </div>
                    <div>
                        <div className="likes-amount"> {story.likedBy.length} Likes</div>
                        <div className="story-description">
                        <span>{story.by.fullname}</span>
                            : {story.txt}
                            </div>
                            <section>
                            <Link to={`/p/${story._id}`}>Show all {story.comments.length} comments</Link>
                            <CommentAdding story ={story} user = {user}/>
                            </section>
                    </div>
                    {/* <button onClick={()=> {removeStory(story.id)}}>Remove</button>
                    <button onClick={()=> {updateStory()}}>Edit</button> */}
        
        </div>

    )
}