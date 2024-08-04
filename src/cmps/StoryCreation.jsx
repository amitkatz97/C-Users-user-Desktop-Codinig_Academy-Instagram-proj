import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { loadStories , addStory ,removeStory , updateStory} from "../store/story.actions"
import { storyService } from "../services/story.service";
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import { Accordion } from '../cmps/Accordion.jsx';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiList from "./EmojiList.jsx";

export function StoryCreation({isOpen , closeModal}){
    
    const [newStory, setNewStory] = useState({})
    const [isEmojiOpen, setEmojiOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    useEffect(()=> {
       Init()
    }, [isOpen])


    async function Init(){
        const story = await storyService.getEmptyStory()
        setNewStory(story)
    }


    function displayPreview(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('preview');
        const reader = new FileReader();
  
        reader.onloadend = function() {
          preview.src = reader.result;
          document.getElementById('image-preview').style.display = 'block';
          document.getElementById('upload-form').style.display = 'none'
          const update = {...newStory, imgUrl : preview.src}
          setNewStory(update)
        }
  
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = '';
          document.getElementById('image-preview').style.display = 'none';
        }
        
    }

    function onContinueUploading(){
        document.getElementById("story-information").style.display = 'block'
        document.getElementById("next").style.display = 'none'
    }

    function handelChange(ev){
        ev.preventDefault()
        setInputValue(ev.target.value)
        const story = {...newStory, txt : ev.target.value }
        setNewStory(story)
    }
    const toggleDropdown = () => setEmojiOpen(prev => !prev);

    function handleSelect(emoji){
        const { selectionStart, selectionEnd } = document.getElementById('descprition');
            // Insert emoji at the cursor position
            const newValue =
            inputValue.slice(0, selectionStart) +
            emoji +
            inputValue.slice(selectionEnd);
        setInputValue(newValue);
        const story =  {...newStory, txt :newValue }
        setNewStory(story)
        setEmojiOpen(false);
      };

    async function onSave(){
        addStory(newStory)
        onClose()
    }

    function onClose(){
        setInputValue("")
        closeModal()
    }

    
        

if (!isOpen) return null
    return(
    <div className="story-create-overlay">
     <button onClick={onClose} className="close-btn">X</button>
            <section className="story-create-form">
                {/* <header>Hey!</header> */}
            <div className="image-uploading">
            <form id='upload-form'action="/upload" method="post" encType="multipart/form-data">
                <h2>
                <CropOriginalOutlinedIcon fontSize="large" />
                </h2>
                <label htmlFor="photo" className="upload-button"> Select a photo</label>
                <input type="file" id='photo' name='photo' accept=".jpg, .jpeg, .png" onChange={()=> displayPreview(event)}/>
                {/* <button type="submit"> Upload </button> */}
            </form>
            <div id="image-preview" className="image-preview">
                <img id='preview' className='uploaded-img' src="#" alt="Uploaded Image" />
            </div>
            </div>
            <section>
            {(newStory.imgUrl !== '') ? (
            <button id="next" className= 'next-btn' onClick={onContinueUploading}>Next</button> ) : (<div> </div>)
            }
            <article id ="story-information" className="story-information">
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
                    <button  onClick={toggleDropdown}><InsertEmoticonIcon/></button>
                    <EmojiList isEmojiOpen= {isEmojiOpen} onSelect= {handleSelect}/>
                    <button onClick={onSave} className="next-btn">Share</button>
            </article>
            </section>
            </section>
            


    </div>
    )
}