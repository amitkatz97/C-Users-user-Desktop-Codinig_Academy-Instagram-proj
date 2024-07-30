import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { loadStories , addStory ,removeStory , updateStory} from "../store/story.actions"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { utilService } from "../services/util.service";
import { Accordion } from "./Accordion";

export function StoryPreview({story}){
    const user = useSelector(userState => userState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [isUserLike, setIsUserLike] = useState(false)

    // useEffect(() =>{
    //     like(stories)
    // },[])
    


    function like(stories){
        stories.map(story => {
            story.likedBy.map(like =>{
                if (like._id === 'A1997' ){
                    onLike(story)
                } 
            })
        })
        // let { likedBy } =story
        // console.log(likedBy)
        // likedBy.map(like =>{
        //     if (like._id === 'A1997' ){
        //         setIsUserLike(true)
        //     } 
        // })
    }

    function onLike(story){
        if (isUserLike){
            let newLikedBy = story.likedBy.filter(like => like._id !== 'A1997')
            story = {...story, likedBy: newLikedBy}
            setIsUserLike(false)
        } else {
            story.likedBy.push(
                {
                    _id: user._id,
                    fullname: user.fullname,
                    imgUrl: user.imgUrl
                }
            ) ,setIsUserLike(true) }
            updateStory(story)
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
                        <button onClick={() => {like(story)}}><ModeCommentOutlinedIcon/></button>
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
                            <Accordion title="Show Comments">
                            <div className="story-comments">
                            {story.comments.map(comment => 
                                <article key={utilService.makeId()}><span>{comment.by.fullname}:</span> {comment.txt}</article>
                            )}
                            <Link to={`/p/${story._id}`}>Show all comments...</Link>
                            </div>
                        </Accordion>
                       
                    </div>
                    {/* <button onClick={()=> {removeStory(story.id)}}>Remove</button>
                    <button onClick={()=> {updateStory()}}>Edit</button> */}
        
        </div>

    )
}