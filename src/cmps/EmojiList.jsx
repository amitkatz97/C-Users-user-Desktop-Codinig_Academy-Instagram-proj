import React from 'react';
import PropTypes from 'prop-types';

const EmojiList = ({ isEmojiOpen, onSelect }) => {


  if (!isEmojiOpen) {
    return null; // Do not render anything if isOpen is false
  }

  const emojis = [
    '😊', '😂', '😍',  '😎',
     '😢', '🤔', '😜', 
    '😴', '😡', '😱', '🙄', '😷',
    '😳', '😇', '🤤', '😈',
    '🤡', '🤠', '😵', '😯', '🤗'
  ]; 

  return (
    <div className="emoji-dropdown">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="emoji-option"
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

// Define PropTypes for validation
EmojiList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default EmojiList;
