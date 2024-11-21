import { useState, useEffect,useRef } from "react"
import { addComment } from "../store/story.actions"
import { EmojiEmotions } from "@mui/icons-material"
import { HiOutlineEmojiHappy } from "react-icons/hi";
import BasicPopover from '../cmps/PopOver.jsx'
import EmojiList from "./EmojiList"


export function CommentAdding({ story, user, font_size = "1.1em", reverse }) {
    const [inputValue, setInputValue] = useState("")
    const [isEmojiOpen, setEmojiOpen] = useState(false)
    const commentInputRef = useRef()


    function handelChange(ev) {
        ev.preventDefault()
        setInputValue(ev.target.value)
    }
    function handleSelect(emoji) {
        const { selectionStart, selectionEnd } = commentInputRef.current
        const newValue =
            inputValue.slice(0, selectionStart) +
            emoji +
            inputValue.slice(selectionEnd);
        setInputValue(newValue);
        setEmojiOpen(false);
    };


    function onSave() {
        addComment(story, user, inputValue)
        setInputValue("")
    }

    const toggleDropdown = () => setEmojiOpen(prev => !prev);


    return (
        <div className="comment-area">
            <label htmlFor="comment"></label>
            <input ref={commentInputRef} type="text" id="comment" name="comment"
                placeholder="Add a comment.."
                value={inputValue}
                onChange={handelChange}
            />
            {inputValue ? (
                <button className="add-btn" onClick={onSave}>Post</button>
            ) : (<div> </div>)
            }
            <button className="emoji-btn" onClick={toggleDropdown}>
            <BasicPopover header={<HiOutlineEmojiHappy size={font_size} className="emoji-icon" />} 
              content= {<EmojiList handleSelect={handleSelect}/>} >
            </BasicPopover>
            </button>
        </div>
    )
}