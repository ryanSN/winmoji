import React from 'react';

const EmojiList = ({ filteredContent, onEmojiClick }) => {
  return (
    <ul>
      {filteredContent.map((emoji, idx) => {
        return (
          <li key={idx} className="results__item">
            <a href="#" className="results__link" onClick={() => onEmojiClick(this, emoji)}>
              {emoji.char}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default EmojiList;
