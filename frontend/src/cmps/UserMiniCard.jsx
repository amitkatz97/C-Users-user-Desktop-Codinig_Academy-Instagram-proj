import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { addFollow, isUserFollowCheck } from '../store/user.actions'
import { logout } from "../store/user.actions.js"
import Loader from '../cmps/Loader.jsx'




export function UserMiniCard({user, fromHome = true}){

    const currUser = useSelector(userState => userState.userModule.user)
    const navigate = useNavigate()

    const [isUserFollow, setIsUserFollow] = useState(false)
    const [isLodaing, setIsLoading] = useState(true)

    useEffect(()=>{
        // console.log("userMiniCard is rendering", currUser, "user :",user)
    },[user, currUser])

    useEffect(()=> {
        setTimeout(() => {
            setIsUserFollow(isUserFollowCheck(currUser, user)) 
        }, 100);
        setIsLoading(false)
    },[user])

    const classKind = fromHome ? "user-card" : "user-card-2"
    const btnClass = isUserFollow? "unfollow" : "follow"


    function onLogout() {
        console.log("logout attempted ")
        navigate("/login")
        logout()
    }

    async function onFollow(){
        console.log(user)
        setIsUserFollow(!isUserFollow)
        await addFollow(currUser ,user)
    }


    if (!user) return <span><Loader/></span>
    if (isLodaing) return <span><Loader/></span>
    return(
        <section className={classKind}>
            <img src={user.imgUrl} alt=""/>
            <a onClick={() => {navigate(`/${user._id}`) }}>{user.fullname}</a>
            {currUser._id === user._id? (<button onClick={onLogout}>Switch</button>):(<button className={btnClass} onClick={onFollow}>
                {isUserFollow? ('Following'):('Follow')} 
                </button>)}
        </section>
    )
}