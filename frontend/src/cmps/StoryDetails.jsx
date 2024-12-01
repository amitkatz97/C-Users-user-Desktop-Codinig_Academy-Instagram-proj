import { useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams, useNavigate ,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStory, addLike, isUserLikeCheck, addCommentLike } from '../store/story.actions'
import { updateStory } from '../store/story.actions.js';
import { CommentAdding } from './CommentAdding.jsx';
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import { CommentPreview } from './CommentPreview.jsx';
import { NotificationIconRed, MessageIcon, MessageIconFull, NotificationIcon, NotificationIconFull, ReelsIcon, ReelsIconFull, SearchIcon, SearchIconFull, ExploreIcon, ExploreIconFull, CreateIcon, CommentIcon } from './SVG.jsx';
import BasicModal from "../cmps/Modal.jsx"
import { UserMiniCard } from "./UserMiniCard.jsx";


import Loader from './Loader.jsx';
import { utilService } from '../services/util.service.js';



export function StoryDetails() {

    const story = useSelector(storyState => storyState.storyModule.story)
    const user = useSelector(userState => userState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    const [isUserLike, setIsUserLike] = useState()
    const [isLoading, setIsLoading] = useState(true)



    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        updateStory()
    }, [])

    async function updateStory() {
        await loadStory(params.storyId)
        setIsLoading(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsUserLike(isUserLikeCheck(story, user))
        }, 100);
    }, [story])


    function onClose() {
        let paramsKeys = Object.keys(params)
        let locationComponenet = location.pathname
        let lastKey = paramsKeys[paramsKeys.length - 1]
        delete params[lastKey]
        if (locationComponenet.includes('explore')) {
            navigate(`/explore`)
        }
        else if (paramsKeys.includes('userId')) {
            const { userId } = params
            navigate(`/${userId}`)
        }
        else { navigate('/home') }
    }

    async function onLike() {
        const likestatus = await addLike(story, user)
        setIsUserLike(likestatus)
    }

    async function onCommentLike(comment) {
        const commentLike = await addCommentLike(story, comment, user)
    }



    if (isLoading) return <Loader />
    return (
        <div className='story-details'>
            <div className='overlay'>
                <button className="close-btn" onClick={onClose}><IoCloseSharp size="1.5em" /></button>
                <div className='story-details-content'>
                    <img className='picture' src={story.imgUrl} alt="" />
                    <article className='comments-list'>
                        <div className='header' onClick={() => { navigate(`/${story.by._id}`) }}> <img src={story.by.imgUrl} alt="" /> {story.by.fullname}</div>
                        <div className="story-description">
                            <span><img src={story.by.imgUrl} alt="" />{story.by.fullname}</span>
                            : {story.txt}
                        </div>
                        <div className='users-comments'>
                            {story.comments.map(comment =>
                                <li key={utilService.makeId()} style={{ listStyle: 'none' }}>
                                    <CommentPreview comment={comment} user={user} addCommentLike={onCommentLike} />
                                </li>
                            )}
                        </div>
                        <div className='actions'>
                            {isUserLike ? (
                                <button onClick={() => { onLike(story) }}><NotificationIconRed /></button>) :
                                (<button onClick={() => { onLike(story) }}><NotificationIcon /></button>)
                            }
                            <button><CommentIcon /></button>
                            <button><MessageIcon /></button>
                        </div>
                        <div className="likes-amount">
                            <BasicModal header={`${story.likedBy.length} Likes`} text={"Likes"} content={story.likedBy.map(user =>
                                <li style={{ listStyle: 'none' }} key={story._id}>
                                    <UserMiniCard user={user} fromHome={false} isMiniUser={true} />
                                </li>
                            )} />
                        </div>
                        <div>
                            <CommentAdding story={story} user={user} font_size={'24px'} reverse={true} fromDetailes ={true}/>
                        </div>
                    </article>
                </div>

            </div>
        </div>
    )

}