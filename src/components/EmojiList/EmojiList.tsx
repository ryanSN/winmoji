/* eslint-disable jsx-a11y/anchor-is-valid */
// TODO: Fix this disable
import { Key } from 'react';

interface EmojiListTypes {
  filteredContent: any;
  onEmojiClick: (emoji: { name: string; char: string }) => void;
}

const EmojiList = ({ filteredContent, onEmojiClick }: EmojiListTypes) => {
  return (
    <ul>
      {filteredContent.map((emoji: { name: string; char: string }, idx: Key | null | undefined) => {
        return (
          <li key={idx} className="results__item">
            <a href="#" className="results__link" onClick={() => onEmojiClick(emoji)}>
              {emoji.char}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default EmojiList;
