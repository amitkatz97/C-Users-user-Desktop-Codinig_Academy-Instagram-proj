import { useState } from "react"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Loader from "./Loader";
import {useNavigate, Link, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'




export function UserStories({story, profile}){


    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)

const handleMouseEnter = () =>{
    console.log("story from userStories:", story)
    setIsHovered(true)
}

const handleMouseLeave = () =>{
    setIsHovered(false)
}
    
    if (!story) return <Loader/>
    return(
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="user-story" onClick={() => {navigate(`/${profile._id}/${story._id}`)}}>
            <img src={story.imgUrl} alt="" />
            {isHovered? (<div className="hovered">
                <section className="like-display">
                    <FavoriteOutlinedIcon/>
                    {story.likedBy.length}
                </section>
                <section className="comments-display">
                    <ModeCommentOutlinedIcon/>
                    {story.comments.length}
                </section>
            </div>
            ):(
            <div></div>)}
        </div>
    )

}