import React, { Component } from 'react'
import Search from '../components/Search'
import Results from '../components/Results'
import emojilib from 'emojilib'
import lev from 'fast-levenshtein'
import { clipboard, ipcRenderer } from 'electron'

const similarity = (() => {
  const mem = {}
  return (_a) => (_b) => {
    const [a, b] = _b < _a ? [_b, _a] : [_a, _b]

    if (!([a, b] in mem)) {
      mem[[a, b]] = 1 - lev.get(a, b) / Math.max(a.length, b.length)
    }

    return mem[[a, b]]
  }
})()

const emojiList = (search) => {
  const emojis = Object.entries(emojilib.lib)
    .map(([name, details]) => {
      const searchSim = similarity(search)
      const sims = [searchSim(name)].concat(details.keywords.map(searchSim))
      return { name, sim: Math.max.apply(null, sims) }
    })
    .filter(({ name, sim }) => sim >= 0.5)
    .sort((a, b) => b.sim - a.sim)
    .map(({ name }) => emojilib.lib[name])

  return emojis.length === 0
    ? Object.values(emojilib.lib)
    : emojis
}

export default class Root extends Component {
  constructor () {
    super()
    this.state = {
      search: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnEmojiClick = this.handleOnEmojiClick.bind(this)
  }

  componentDidMount () {
    ipcRenderer.on('window-open', (event, message) => {
      this.inputSearch.focus()
    })
  }

  handleOnChange (event) {
    this.setState({ search: event.target.value })
  }

  handleOnEmojiClick (e, emoji) {
    clipboard.writeText(emoji.char)
  }

  render () {
    const emojis = emojiList(this.state.search.toLowerCase())

    return (
      <div>
        <Search onChange={this.handleOnChange} inputRef={(input) => { this.inputSearch = input }} />
        <div className='results'>
          <Results
            filteredContent={emojis}
            onEmojiClick={this.handleOnEmojiClick}
          />
        </div>
      </div>
    )
  }
}
