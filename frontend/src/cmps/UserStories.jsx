import { useEffect, useState } from "react"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Loader from "./Loader";
import { useNavigate, Link, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'




export function UserStories({ story, watchedUser, navigateToDetailes , isFollow}) {


    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)
    

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    if (!story) return <Loader />
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="user-story" onClick={() => { navigateToDetailes(story._id) }}>
            <img src={story.imgUrl} alt="" />
            {isHovered ? (<div className="hovered">
                <section className="like-display">
                    <span>{story.likedBy.length}</span>
                    <FavoriteOutlinedIcon />
                </section>
                <section className="comments-display">
                    <span>{story.comments.length}</span>
                    <ChatBubbleIcon color="white" />
                </section>
            </div>
            ) : (
                <div></div>)}
        </div>
    )

}