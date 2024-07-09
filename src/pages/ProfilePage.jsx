import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { storyService } from '../services/story.service'
import { userService } from '../services/user.service'
import { loadUser } from '../store/user.actions'

export function ProfilePage(){

    const user = useSelector(userState => userState.userModule.watchedUser)

    const params = useParams()
    const [profile , setProfile] = useState()

    useEffect(()=>{
        Init()
        // console.log(user)
        // console.log(params)
        // loadUser(params.userId)
        // setProfile(user)
    },[user])

    async function Init(){
        await loadUser(params.userId)
        setProfile(user)
    }

    // async function loadProfile(){
    //     const profile = await userService.getById(params.userId)
    //     console.log(profile)
    //     setProfile(profile)
    // }

    if (!profile) return <div>loading...</div>
    return(
        <>
        <h1>This is Profile Page</h1>
            <section>
                <h1>{profile.fullname}</h1>
                <img src={profile.imgUrl} alt="No picture" />
            </section>
        </>    
    )
}