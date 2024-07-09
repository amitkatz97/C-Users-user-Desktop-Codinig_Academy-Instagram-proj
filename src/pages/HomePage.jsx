import { storyReducer } from "../store/story.reducer"
import { loadStories , addStory ,removeStory , updateStory} from "../store/story.actions"
import { store } from "../store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link ,Outlet } from "react-router-dom"
import { StoryPreview } from "../cmps/StoryPreview"


export function HomePage() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    useEffect(() =>{
        loadStories()
    },[])

    function test(){
        // console.log(store.getState().storyModule.stories)
        // story_names = stories.map(story => story.name)
        console.log(stories)
    }

   

    if (!stories) return <div>loading...</div>
    return (
        <section>
            <h1>Home sweet Home</h1>
            <ul className="home">
                {stories.map(story =>
                    <li key={story._id} onClick={() => {test(story)}}>
                        <StoryPreview story = {story} />
                    </li>
                )}
            </ul>
            <button onClick={() => {addStory(story4)}}> Add Story</button>
            <div className="story-detailes">
                <Outlet/>
            </div>
        </section >
    )
}

const story4= {
    txt: "This is the new story",
    by: {
        _id: "u101",
        fullname: "Amit Katz",
        imgUrl: "http://some-img"
    },
    comments:[],
    tags:['fun', 'Sea']
}

const story5={
    id: 'xTFLdY',
    txt: "This is Editted story",
    by: {
        _id: "u104",
        fullname: "Avi Avigdor",
        imgUrl: "http://some-img"
    },
    comments:[],
    tags:['fun']
}