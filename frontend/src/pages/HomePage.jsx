
import { loadStories, addLike, loadAllStories } from "../store/story.actions"
import { store } from "../store/store"
import { useEffect, useState , useRef} from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { StoryPreview } from "../cmps/StoryPreview"
import { UserList } from "../cmps/UsersList.jsx"
import Loader from '../cmps/Loader.jsx'
import { utilService } from "../services/util.service.js"
import { loadUsers } from "../store/user.actions.js"
import { socketService, SOCKET_EVENT_USER_UPDATED , SOCKET_EVENT_STORY_UPDATED} from '../services/socket.service'
import { getCmdUpdateStory } from "../store/story.actions.js"


export function HomePage() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(userState => userState.userModule.user)
    const users = useSelector(userState => userState.userModule.users)
    // const story = useSelector(storeState => storeState.storyModule.story)

    

    useEffect(() => {
        Init()
        socketService.on(SOCKET_EVENT_STORY_UPDATED, async (story) =>{
            console.log("GOT from socket," ,story)
            store.dispatch(getCmdUpdateStory(story))
        })
            
        return () =>{
            socketService.off(SOCKET_EVENT_STORY_UPDATED)
        }
    }, [])

    async function Init(){
        console.log("user:", user)
        console.log("Home is rendering")
        await loadStories(user)
        await loadAllStories()
        await loadUsers()
    }


    function onLike(story) {
        addLike(story, user)
    }


    if (!stories) return <div><Loader /></div>
    if (!user) return <div><Loader /></div>
    return (
        <section className="home-page">
            <ul className="stories-list">
                {stories.map(story =>
                    <li key={utilService.makeId()}>
                        <StoryPreview story={story} onLike={onLike} />
                    </li>
                )}
            </ul>
            <ul className="users-list-area">
                <UserList user={user}/>
            </ul>
            <Outlet />
        </section >
    )
}

