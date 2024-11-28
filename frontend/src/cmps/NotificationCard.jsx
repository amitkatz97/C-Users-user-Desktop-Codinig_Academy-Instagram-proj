import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"


export function NotificationCard({by ,story}){

    useEffect(()=>{
        // console.log("by:", by, "story:", story)
    },[])
    const navigate = useNavigate()



    if (!by && !story) return <div></div>
    return (
        <div className="notification-card">
            <img src={by.imgUrl} alt=""  className="by-img" onClick={() => {navigate(`/${by._id}`) }}/>
            <span className="by-fullname" onClick={() => {navigate(`/${by._id}`) }}> <b>{by.fullname} </b> liked your photo</span>
            <img src={story.imgUrl} alt="" className="story-img" onClick={() => {navigate(`/home/${story._id}`) }}/>
        </div>
    )


}