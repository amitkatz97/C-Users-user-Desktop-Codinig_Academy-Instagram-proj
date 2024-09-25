import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { addFollow } from '../store/user.actions'




export function UserMiniCard({user}){

    const currUser = useSelector(userState => userState.userModule.user)
    const navigate = useNavigate()

    useEffect(()=>{
        
    },[])


    async function onFollow(){
        await addFollow(currUser ,user)
    }


    if (!user) return <div>Hey</div>
    return(
        <section className="user-card">
            <img src={user.imgUrl} alt=""/>
            <a onClick={() => {navigate(`/${user._id}`) }}>{user.fullname}</a>
            {currUser._id === user._id? (<button>Switch</button>):(<button onClick={onFollow}>Follow</button>)}
        </section>
    )
}