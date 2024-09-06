import { useState, useEffect } from "react"
import { addComment } from "../store/story.actions"
import { EmojiEmotions } from "@mui/icons-material"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiList from "./EmojiList"


export function CommentAdding({story, user}){
    const [inputValue, setInputValue] = useState("")
    const [isEmojiOpen, setEmojiOpen] = useState(false)


    function handelChange(ev){
        ev.preventDefault()
        setInputValue(ev.target.value)
    }
    function handleSelect(emoji){
        const { selectionStart, selectionEnd } = document.getElementById('comment');
            const newValue =
            inputValue.slice(0, selectionStart) +
            emoji +
            inputValue.slice(selectionEnd);
        setInputValue(newValue);
        setEmojiOpen(false);
      };


    function onSave(){
        addComment(story, user, inputValue)
        setInputValue("")
    }

    const toggleDropdown = () => setEmojiOpen(prev => !prev);


    return(
        <div className="comment-area">
            <label htmlFor="comment"></label>
            <input type="text" id="comment" name="comment" 
               placeholder="Add Comment.."
               value={inputValue}
               onChange={handelChange}
                />
            {inputValue?(
                <button className= "add-btn"onClick={onSave}>Add</button>
            ): (<div> </div>)
            }
            <button className= "emoji-btn" onClick={toggleDropdown}><InsertEmoticonIcon fontSize="small" className="emoji-icon"/></button>
            <EmojiList isEmojiOpen= {isEmojiOpen} onSelect={handleSelect}/>
            
        </div>
    )
}