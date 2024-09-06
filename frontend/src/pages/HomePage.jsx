import { storyReducer } from "../store/story.reducer"
import { loadStories , addStory ,removeStory , updateStory, addLike} from "../store/story.actions"
import { store } from "../store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link ,Outlet } from "react-router-dom"
import { StoryPreview } from "../cmps/StoryPreview"


export function HomePage() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(userState => userState.userModule.user)
    const [isUserLike, setIsUserLike] = useState(false)

    useEffect(() =>{
        loadStories()
    },[])


    function onLike(story){
        addLike(story, user)
    }

    if (!stories) return <div>loading...</div>
    return (
        <section>
            <ul className="home">
                {stories.map(story =>
                    <li key={story._id}>
                        <StoryPreview story = {story} onLike={onLike}/>
                    </li>
                )}
            </ul>
                <Outlet/>
        </section >
    )
}

