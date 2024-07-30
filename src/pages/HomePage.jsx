import { storyReducer } from "../store/story.reducer"
import { loadStories , addStory ,removeStory , updateStory} from "../store/story.actions"
import { store } from "../store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link ,Outlet } from "react-router-dom"
import { StoryPreview } from "../cmps/StoryPreview"


export function HomePage() {
    // const stories = useSelector(storeState => storeState.storyModule.stories)

    const [storiesList, setStoriesList] = useState()
   
    useEffect(() =>{
       Init()
    },[])

    async function Init(){
        const stories = await loadStories()
        setStoriesList(stories)
    }


   

    if (!storiesList) return <div>loading...</div>
    return (
        <section>
            <h1>Home sweet Home</h1>
            <ul className="home">
                {storiesList.map(story =>
                    <li key={story._id}>
                        <StoryPreview story = {story} />
                    </li>
                )}
            </ul>
                <Outlet/>
        </section >
    )
}

