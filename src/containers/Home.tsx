import React, { useContext, useRef, useState } from 'react';
import Search from '../components/Search/Search';
import EmojiList from '../components/EmojiList/EmojiList';
import * as winmojilib from 'winmojilib';
import lev from 'fast-levenshtein';
import { ElectronContext } from '../contexts';
import styled from 'styled-components/macro';
interface Emoji {
  name: string;
  char: string;
  sim?: number | undefined;
  keywords: string[];
  group: string;
  hexcode: string;
  subgroup: string;
}

const StyledEmojiContainer = styled.div`
  padding: 5px;
`;

const HISTORY_MAX = 5;
const transformedEmojis = Object.entries(winmojilib.lib).map(([name, details]) => ({
  ...details,
  name,
}));

const similarity: (a: string) => (b: string) => number = (() => {
  const mem: { [ab: string]: number } = {};

  return (_a: string) => (_b: string) => {
    const [a, b] = _b < _a ? [_b, _a] : [_a, _b];

    const ab = [a, b].toString();

    if (!(ab in mem)) {
      mem[ab] = 1 - lev.get(a, b) / Math.max(a.length, b.length);
    }

    return mem[ab];
  };
})();

const emojiList = (search: string) => {
  const emojis: Emoji[] = transformedEmojis
    .map((emoji) => {
      const searchSim = similarity(search);
      const sims = [searchSim(emoji.name)].concat(emoji.keywords.map(searchSim));
      return { ...emoji, sim: Math.max.apply(null, sims) };
    })
    .filter(({ sim }) => sim >= 0.5)
    .sort((a, b) => b.sim - a.sim)
    .map((emoji: Emoji) => {
      delete emoji.sim;
      return emoji;
    });

  return emojis.length === 0 ? transformedEmojis : emojis;
};

const Home = () => {
  const { onClipboardWrite } = useContext(ElectronContext);

  const [recentEmojis, setRecentEmojis] = useState<{ name: any; char: string }[]>([]);
  const [search, setSearch] = useState('');
  const inputSearch = useRef<null | HTMLInputElement>(null);

  const handleOnChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearch(event.target.value);
  };

  const handleOnEmojiClick = (emoji: { name: any; char: string }) => {
    const emojiIndex = recentEmojis.findIndex(({ name }) => emoji?.name === name);
    const recentQueue =
      emojiIndex >= 0
        ? [emoji, ...recentEmojis.slice(0, emojiIndex), ...recentEmojis.slice(emojiIndex + 1)]
        : [emoji, ...recentEmojis.slice(0, HISTORY_MAX - 1)];
    setRecentEmojis(recentQueue);
    if (onClipboardWrite) {
      onClipboardWrite(emoji.char);
    }
  };

  // for getting groups (future tab filter)
  // const unique = [...new Set(searchedEmojis.map((item) => item.group))];
  // console.log('unique', unique);
  const searchedEmojis = emojiList(search.toLowerCase());

  return (
    <StyledEmojiContainer>
      <Search onChange={handleOnChange} ref={inputSearch} />
      <div className="emojis">
        {recentEmojis.length > 0 && (
          <>
            <span className="recent__title">Recent:</span>
            <div className="recent">
              <EmojiList filteredContent={recentEmojis} onEmojiClick={handleOnEmojiClick} />
            </div>
          </>
        )}
        <div className="results">
          <EmojiList filteredContent={searchedEmojis} onEmojiClick={handleOnEmojiClick} />
        </div>
      </div>
    </StyledEmojiContainer>
  );
};

export default Home;
