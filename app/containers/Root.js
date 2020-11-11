import React, { Component } from 'react';
import Search from '../components/Search';
import EmojiList from '../components/EmojiList';
import * as winmojilib from 'winmojilib';
import lev from 'fast-levenshtein';
import { clipboard, ipcRenderer } from 'electron';

const HISTORY_MAX = 5;
const transformedEmojis = Object.entries(winmojilib.lib).map(([name, details]) => ({
  ...details,
  name,
}));

const similarity = (() => {
  const mem = {};
  return (_a) => (_b) => {
    const [a, b] = _b < _a ? [_b, _a] : [_a, _b];

    if (!([a, b] in mem)) {
      mem[[a, b]] = 1 - lev.get(a, b) / Math.max(a.length, b.length);
    }

    return mem[[a, b]];
  };
})();

const emojiList = (search) => {
  const emojis = transformedEmojis
    .map((emoji) => {
      const searchSim = similarity(search);
      const sims = [searchSim(emoji.name)].concat(emoji.keywords.map(searchSim));
      return { ...emoji, sim: Math.max.apply(null, sims) };
    })
    .filter(({ sim }) => sim >= 0.5)
    .sort((a, b) => b.sim - a.sim)
    .map((emoji) => {
      delete emoji.sim;
      return emoji;
    });

  return emojis.length === 0 ? transformedEmojis : emojis;
};

export default class Root extends Component {
  constructor() {
    super();
    this.state = {
      recentEmojis: [],
      search: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnEmojiClick = this.handleOnEmojiClick.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('window-open', (event, message) => {
      this.inputSearch.focus();
    });
  }

  handleOnChange(event) {
    this.setState({ search: event.target.value });
  }

  handleOnEmojiClick(e, emoji) {
    const { recentEmojis } = this.state;
    const emojiIndex = recentEmojis.findIndex(({ name }) => emoji.name === name);
    const recentQueue =
      emojiIndex >= 0
        ? [emoji, ...recentEmojis.slice(0, emojiIndex), ...recentEmojis.slice(emojiIndex + 1)]
        : [emoji, ...recentEmojis.slice(0, HISTORY_MAX - 1)];
    this.setState({ recentEmojis: recentQueue });
    clipboard.writeText(emoji.char);
  }

  render() {
    const searchedEmojis = emojiList(this.state.search.toLowerCase());
    const { recentEmojis } = this.state;

    return (
      <div>
        <Search
          onChange={this.handleOnChange}
          inputRef={(input) => {
            this.inputSearch = input;
          }}
        />
        <div className="emojis">
          {recentEmojis.length > 0 && (
            <>
              <span className="recent__title">Recent:</span>
              <div className="recent">
                <EmojiList filteredContent={recentEmojis} onEmojiClick={this.handleOnEmojiClick} />
              </div>
            </>
          )}
          <div className="results">
            <EmojiList filteredContent={searchedEmojis} onEmojiClick={this.handleOnEmojiClick} />
          </div>
        </div>
      </div>
    );
  }
}
