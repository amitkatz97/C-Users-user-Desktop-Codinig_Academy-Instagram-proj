import { storyReducer } from "../store/story.reducer"
import { loadStories, addStory, removeStory, updateStory, addLike } from "../store/story.actions"
import { store } from "../store/store"
import { useEffect, useState , useRef} from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { StoryPreview } from "../cmps/StoryPreview"
import { UserList } from "../cmps/UsersList.jsx"
import Loader from '../cmps/Loader.jsx'


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

    // async function loadPartOfStories(amount = 5 ){
    //     setIsLoading(true)
    //     try {
    //         const nextStories = await stories.slice(nextIdx.current * amount, nextIdx.current++ * amount)
    //         setStoriesToDisplay(prevStories => [...prevStories, ...nextStories])
    //     } catch (err) {
    //         console.log("err:", err)
    //     }
    //     finally{
    //         setIsLoading(false)
    //     }
    // }

    if (!stories) return <div><Loader /></div>
    if (!user) return <div><Loader /></div>
    return (
        <section className="home-page">
            <ul className="stories-list">
                {stories.map(story =>
                    <li key={story._id}>
                        <StoryPreview story={story} onLike={onLike} />
                    </li>
                )}
                {/* {isLoading && <Loader/>}
                <div ref={bottomDiv} className='bottom-div'></div> */}
            </ul>
            <ul className="users-list-area">
                <UserList user={user}/>
            </ul>
            <Outlet />
        </section >
    )
}

