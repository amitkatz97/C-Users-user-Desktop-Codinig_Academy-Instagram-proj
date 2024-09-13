import { useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams ,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStory , addLike ,isUserLikeCheck ,addCommentLike} from '../store/story.actions'
import { updateStory } from '../store/story.actions.js';
import { CommentAdding } from './CommentAdding.jsx';
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import { CommentPreview } from './CommentPreview.jsx';


import Loader from './Loader.jsx';



export function StoryDetails(){

    const comment = useSelector(storyState => storyState.storyModule.comment)
    const story = useSelector(storyState => storyState.storyModule.story)
    const user = useSelector(userState => userState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    
    const [isUserLike, setIsUserLike] = useState()
    const [isLoading, setIsLoading] = useState(true)

    

    const params = useParams()
    const navigate = useNavigate()
    

    useEffect(()=> {
       updateStory() 
    },[])

    async function updateStory(){
        await loadStory(params.storyId)
        setIsLoading(false)
    }

    useEffect(()=> {
        setTimeout(() => {
            setIsUserLike(isUserLikeCheck(story, user)) 
        }, 1000);
    },[story])
    

    function onClose(){
       let paramsKeys = Object.keys(params)
       console.log(params)
       let lastKey = paramsKeys[paramsKeys.length -1]
       delete params[lastKey]
        if (paramsKeys.includes('userId')) {
            const {userId} = params
            navigate(`/${userId}`)}
        else if(paramsKeys.includes('explore')){
            const {explore} = params
            navigate(`/${explore}`)
        }
        else {navigate('/')}
    }

    async function onLike(){
        const likestatus = await addLike(story, user)
        setIsUserLike(likestatus)
    }

    async function onCommentLike(comment){
        const commentLike = await addCommentLike(story, comment, user)
    }



    if (isLoading) return <Loader/>
    return(
        <div className='story-details'>
            <div className='overlay'>
            <button className ="close-btn" onClick={onClose}><IoCloseSharp size="1.5em"/></button>
                <div className='content'>
                    <img className='picture' src={story.imgUrl} alt="" />
                    <article className='comments-list'>
                        <div className='header' onClick={() =>{navigate(`/${story.by._id}`)}}> <img src={story.by.imgUrl} alt="" /> {story.by.fullname}</div>
                        <div className="story-description">
                        <span><img src={story.by.imgUrl} alt="" />{story.by.fullname}</span>
                            : {story.txt}
                            </div>
                            <div className='users-comments'>
                            {story.comments.map(comment => 
                                <li key={comment._id} style={{listStyle: 'none'}}>
                                    <CommentPreview comment = {comment} user = {user} addCommentLike= {onCommentLike}/>
                                </li>
                            )}
                            </div>
                        <div className='actions'>
                        {isUserLike ? (
                        <button onClick={()=> {onLike(story)}}><FaHeart size="2em" color='red'/></button>) : 
                        ( <button onClick={()=> {onLike(story)}}><FaRegHeart size="2em"/></button>)
                        }
                            <button><TbMessageCircle size="2.2em"/></button>
                            <button><TbSend size="2em"/></button>
                        </div>
                        <div>
                            <CommentAdding story={story} user={user} font_size={'24px'} reverse={true}/>
                        </div>
                    </article>
                 </div>
                 
            </div>
        </div>
    )

}