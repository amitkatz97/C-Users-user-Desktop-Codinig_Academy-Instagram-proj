import { storyReducer } from "../store/story.reducer"
import { loadStories, addStory, removeStory, updateStory, addLike, loadAllStories } from "../store/story.actions"
import { store } from "../store/store"
import { useEffect, useState , useRef} from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { StoryPreview } from "../cmps/StoryPreview"
import { UserList } from "../cmps/UsersList.jsx"
import Loader from '../cmps/Loader.jsx'
import { utilService } from "../services/util.service.js"


export function HomePage() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(userState => userState.userModule.user)
    const users = useSelector(userState => userState.userModule.users)

    const [isLoading, setIsLoading] = useState(false)
    const [storiesToDisplay, setStoriesToDisplay] = useState([])
    const bottomDiv = useRef()
    const nextIdx = useRef(0)

    useEffect(() => {
        console.log("Home is rendering")
        loadStories(user)
        loadAllStories()
    }, [user])

    // useEffect(() => {
    //         const observer = new IntersectionObserver((entries) => {
    //         const entry = entries[0]
    //         if (entry.isIntersecting) loadPartOfStories()
    //         }, { rootMargin: '50px', threshold: 1 })
    //         observer.observe(bottomDiv.current)
    // }, [])


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

