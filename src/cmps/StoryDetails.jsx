import { useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams ,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { storyService } from '../services/story.service'
import { loadStory } from '../store/story.actions'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { StoryPreview } from './StoryPreview'
import { Accordion } from './Accordion.jsx'


export function StoryDetails({onLike}){

    const story = useSelector(storyState => storyState.storyModule.story)

    const params = useParams()
    const navigate = useNavigate()
    

    useEffect(()=> {
        Init()      
    },[])

    async function Init(){
        try {
            await loadStory(params.storyId)
        } catch (err) {
            console.log('error with loading story', err)
        }
        
    }

    function onClose(){
        console.log('close is activted')
        navigate('/')
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
                            <div>
                            {story.comments.map(comment => 
                            <div className='comment'><span>{comment.by.fullname}:</span> {comment.txt}</div>
                            )}
                            </div>
                        <div className='actions'>
                            <button><FavoriteBorderOutlinedIcon/></button>
                            <button><ModeCommentOutlinedIcon/></button>
                            <button><NearMeOutlinedIcon/></button>
                        </div>
                    </article>
                 </div>
                 
            </div>
        </div>
    )

}