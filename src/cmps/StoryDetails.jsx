import { useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams ,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStory , addLike ,isUserLikeCheck} from '../store/story.actions'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { updateStory } from '../store/story.actions.js';
import { CommentAdding } from './CommentAdding.jsx';



export function StoryDetails(){

    const story = useSelector(storyState => storyState.storyModule.story)
    const user = useSelector(userState => userState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    const [isUserLike, setIsUserLike] = useState()

    

    const params = useParams()
    const navigate = useNavigate()
    

    useEffect(()=> {
        loadStory(params.storyId) // need to try to implemnt "then" 
    },[])

    useEffect(()=> {
        setTimeout(() => {
            setIsUserLike(isUserLikeCheck(story, user))  
        }, 1000);
    },[story])
    

    function onClose(){
        navigate('/')
    }

    async function onLike(){
        const likestatus = await addLike(story, user)
        setIsUserLike(likestatus)
    }


    if (!story) return <div>loading...</div>
    return(
        <div className='story-details'>
            <div className='overlay'>
            <button className ="close-btn" onClick={onClose}>X</button>
                <div className='content'>
                    <img className='picture' src={story.imgUrl} alt="" />
                    <article className='comments-list'>
                        <div className='header' onClick={() =>{navigate(`/${story.by._id}`)}}> {story.by.fullname} <img src={story.by.imgUrl} alt="" /></div>
                        <div className="story-description">
                        <span>{story.by.fullname}</span>
                            : {story.txt}
                            </div>
                            <div className='users-comments'>
                            {story.comments.map(comment => 
                            <div className='comment'><span>{comment.by.fullname}:</span> {comment.txt}</div>
                            )}
                            </div>
                        <div className='actions'>
                        {isUserLike ? (
                        <button onClick={()=> {onLike(story)}}><FavoriteOutlinedIcon className="icon"/></button>) : 
                        ( <button onClick={()=> {onLike(story)}}><FavoriteBorderOutlinedIcon/></button>)
                        }
                            <button><ModeCommentOutlinedIcon/></button>
                            <button><NearMeOutlinedIcon/></button>
                        </div>
                        <div>
                            <CommentAdding story={story} user={user}/>
                        </div>
                    </article>
                 </div>
                 
            </div>
        </div>
    )

}