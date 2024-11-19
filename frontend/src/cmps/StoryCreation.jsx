import { useEffect, useState } from "react"
import { addStory } from "../store/story.actions"
import { storyService } from "../services/story/story.service.js";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiList from "./EmojiList.jsx";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Loader from "./Loader.jsx";

const CLOUD_NAME = "dhqabxfxc"
const UPLOAD_PRESET = "instagramPosts"

export function StoryCreation({ isOpen, closeModal }) {


    const [newStory, setNewStory] = useState({})
    const [isEmojiOpen, setEmojiOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isReadyToShare, setIsReadyToShare] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState("false")

    useEffect(() => {
        Init()
    }, [isOpen])



    async function Init() {
        const story = await storyService.getEmptyStory()
        setNewStory(story)
        setIsLoading(false)
    }


    // function displayPreview(event) {
    //     const file = event.target.files[0];
    //     if (!file) return
    //     const preview = document.getElementById('preview');
    //     const reader = new FileReader()

    //     reader.onloadend = function () {
    //         preview.src = reader.result;
    //         document.getElementById('image-preview').style.display = 'block';
    //         document.getElementById('upload-form').style.display = 'none'
    //         const update = { ...newStory, imgUrl: preview.src }
    //         setNewStory(update)
    //     }


    //     if (file) {
    //         reader.readAsDataURL(file);
    //     } else {
    //         preview.src = '';
    //         document.getElementById('image-preview').style.display = 'none';
    //     }

    // }

    async function hendleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return
        setIsLoading(true)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("cloud_name", CLOUD_NAME);

        try {
            // Sending the file to Cloudinary's unsigned upload endpoint
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (result.secure_url) {
                console.log("result url:", result.secure_url)
                const update = { ...newStory, imgUrl: result.secure_url }
                setNewStory(update)
                setImageUrl(result.secure_url); // Set the image URL to display it

            } else {
                setImageUrl("")
                console.error("Upload failed", result);
            }
        } catch (err) {
            console.error("Uploading failed,", err)
        }

        finally {
            setIsLoading(false)
            console.log(newStory)
        }

    }

    function onContinueUploading() {
        document.getElementById("story-create-form").style.width = '80%'
        document.getElementById("story-information").style.display = 'flex'
        document.getElementById("next").style.display = 'none'
        setIsReadyToShare(true)
    }

    function handelChange(ev) {
        ev.preventDefault()
        setInputValue(ev.target.value)
        const story = { ...newStory, txt: ev.target.value }
        setNewStory(story)
    }
    const toggleDropdown = () => setEmojiOpen(prev => !prev);

    function handleSelect(emoji) {
        const { selectionStart, selectionEnd } = document.getElementById('descprition');
        // Insert emoji at the cursor position
        const newValue =
            inputValue.slice(0, selectionStart) +
            emoji +
            inputValue.slice(selectionEnd);
        setInputValue(newValue);
        const story = { ...newStory, txt: newValue }
        setNewStory(story)
        setEmojiOpen(false);
    };

    async function onSave() {
        addStory(newStory)
        onClose()
        setIsReadyToShare(false)
    }

    function onClose() {
        // prompt("Are you sure? ")
        setInputValue("")
        setImageUrl("")
        closeModal()
        setIsReadyToShare(false)
    }

    function onUndo() {
        if (isReadyToShare) {
            document.getElementById("story-create-form").style.width = '50%'
            document.getElementById("story-information").style.display = 'none'
            document.getElementById("next").style.display = 'flex'
            setInputValue("")
            setIsReadyToShare(false)
        } else {
            const update = { ...newStory, imgUrl: "" }
            setImageUrl("")
            setNewStory(update)
            // document.getElementById('image-preview').style.display = 'none';
            // document.getElementById('upload-form').style.display = 'block'
        }
    }




    if (!isOpen) return null
    return (
        <div className="story-create-overlay">
            <button onClick={onClose} className="close-btn">X</button>
            <section className="story-create-form" id="story-create-form">
                {isLoading ? (<div><Loader /></div>) : (
                    <div className="image-uploading">
                        {/* <h3>Create New Post!</h3> */}
                        {!imageUrl ? (
                            <form id='upload-form' action="/upload" method="post" encType="multipart/form-data">
                                <h2>
                                    <img src="src/imgs/Upload.svg" alt="" />
                                    Drag photos and videos here
                                </h2>
                                <label htmlFor="photo" className="upload-button"> Select from computer</label>
                                <input type="file" id='photo' name='photo' accept=".jpg, .jpeg, .png" onChange={() => hendleFileChange(event)} />
                                {/* <button type="submit"> Upload </button> */}
                            </form>) : (

                            <div id="image-preview" className="image-preview">
                                <img id='preview' className='uploaded-img' src={imageUrl} alt="Uploaded Image" />
                            </div>
                        )}
                    </div>
                )}
                <div className="btns-area">
                    {(isReadyToShare) ? (<h3>Add Description to the post</h3>) :
                        (<h3>Create New Post</h3>)}
                    {(newStory.imgUrl !== '') ? (
                        <button id="next" className='next-btn' onClick={onContinueUploading}>Next</button>) : (<div> </div>)
                    }
                    {(newStory.imgUrl !== '') ? (
                        <button className="back-btn" onClick={onUndo}><ArrowBackSharpIcon fontSize="medium" /></button>) : (<div> </div>)}
                    {(isReadyToShare) ? (
                        <button onClick={onSave} className="next-btn">Share</button>) : (<div> </div>)}
                </div>
                <section className="inforamtion-area" id="inforamtion-area">
                    <article id="story-information" className="story-information">
                        <article className="story-description">
                            <img src={newStory.by.imgUrl} /> <span>{newStory.by.fullname}</span>
                        </article>
                        <label htmlFor="descprition"></label>
                        <input
                            className="descprition" type="text" id="descprition" name="descprition"
                            placeholder="Add Something"
                            value={inputValue}
                            onChange={handelChange}
                        />
                        <button onClick={toggleDropdown}><InsertEmoticonIcon /></button>
                        <EmojiList isEmojiOpen={isEmojiOpen} onSelect={handleSelect} />

                    </article>
                </section>
            </section>



        </div>
    )
}