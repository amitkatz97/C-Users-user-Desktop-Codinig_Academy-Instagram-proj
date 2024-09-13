import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";


export function CommentPreview({comment, user ,addCommentLike }){

    const story = useSelector(storyState => storyState.storyModule.story)

    const [isUserLike, setIsUserLike] = useState(false)

    useEffect(() =>{
        isLikeComment(comment)
    },[isUserLike, story])



    async function isLikeComment(comment){
        const {likedBy} = comment
        let indexToRemove= likedBy.findIndex(userLike => userLike._id === user._id)
        if (indexToRemove < 0 ) 
            {setIsUserLike(true) }
        else setIsUserLike(false)
    }

    async function onCommentLike(comment){
        setIsUserLike(!isUserLike)
        addCommentLike(comment)
    }





    if (!story) return <div>Loading</div>
    return(
        <div className='comment'><img src={comment.by.imgUrl} alt="" /><span>{comment.by.fullname}:</span> {comment.txt} 
            {isUserLike ? 
            ( <FaRegHeart size="0.8em" onClick={() => onCommentLike(comment)}/>
            ):(
             <FaHeart size="0.8em" color='red' onClick={() => onCommentLike(comment)}/>)}
            </div>
    )
}