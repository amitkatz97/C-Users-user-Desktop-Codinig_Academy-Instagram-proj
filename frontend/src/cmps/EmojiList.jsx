import React from 'react';
import PropTypes from 'prop-types';
// import Popover from '@mui/material/Popover';
import { Typography, Popover } from '@mui/material';

const EmojiList = ({ handleSelect }) => {

  const emojis = [
    '😊', '😂', '😍', '😎',
    '😢', '🤔', '😜',
    '😴', '😡', '😱', '🙄', '😷',
    '😳', '😇', '🤤', '😈',
    '🤡', '🤠', '😵', '😯', '🤗',
    '😩', '😛', '😏', '😬', '😧',
    '🤧', '😵‍💫', '😪', '🤠',
    '😜', '😺', '😻', '🙀', '😹', '😽',
    '🙋‍♂️', '🙋‍♀️', '🙌', '👏', '🤝', '💪', '🙏',
    '💃', '🕺', '👯‍♀️', '👯‍♂️', '👽', '💥', '🔥', '⚡',
    '🌈', '🌞', '🌝', '🌜', '🌟', '✨', '🌻', '🌹', '🌸', '🍀',
    '🍎', '🍇', '🍉', '🍌', '🍍', '🍒', '🍓', '🥝', '🍍', '🍋',
    '🥑', '🍉', '🍓', '🍊', '🍔', '🍟', '🍕', '🍗', '🍖', '🌭',
    '🍖', '🍿', '🍩', '🍪', '🍦', '🍫', '🍬', '🍭', '🍪',
    '🎂', '🍰', '🍮', '🍨', '🥛', '🍺', '🍻', '🥂',
    '🍷', '🍸', '🍹', '🍾', '🥄', '🍽', '🍴',
    '🍕', '🥖', '🧀', '🥓', '🍲', '🍣', '🍱', '🍛', '🥘',
    '🍙', '🍘', '🥗', '🍤', '🍗', '🍛', '🍙'
  ];


  return (
    <div className="emoji-dropdown">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="emoji-option"
          onClick={() => handleSelect(emoji)}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};


export default EmojiList;
