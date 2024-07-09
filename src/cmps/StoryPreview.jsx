import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { loadStories , addStory ,removeStory , updateStory} from "../store/story.actions"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { utilService } from "../services/util.service";

export function StoryPreview({story}){
    const stories = useSelector(storeState => storeState.storyModule.stories)


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
                        <button><FavoriteBorderOutlinedIcon className="icon"/></button>
                        <button><ModeCommentOutlinedIcon/></button>
                        <button><NearMeOutlinedIcon/></button>
                    </div>
                    <div>
                        <div className="likes-amount"> {story.likedBy.length} Likes</div>
                        {/*need to implement accordion*/}
                        {/* {story.likedBy.map(user => 
                            <span> {user.fullname} </span>
                        )} */}
                        <div className="story-description">
                        <span>{story.by.fullname}</span>
                            : {story.txt}
                            </div>
                        <div className="story-comments">
                            {story.comments.map(comment => 
                                <article key={utilService.makeId()}><span>{comment.by.fullname}:</span> {comment.txt}</article>
                            )}
                            <Link to={`/p/${story._id}`}>Show more comments...</Link>
                        </div>
                        {/* <div className="story-detailes">
                        <Outlet/>
                        </div> */}
                    </div>
                    {/* <button onClick={()=> {removeStory(story.id)}}>Remove</button>
                    <button onClick={()=> {updateStory()}}>Edit</button> */}
        
        </div>

    )
}