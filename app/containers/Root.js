import React, {Component} from 'react'
import Search from '../components/Search'
import Results from '../components/Results'
import emojilib from 'emojilib'
import {clipboard} from 'electron'

export default class Root extends Component {
  constructor () {
    super()
    this.state = {
      search: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onEmojiClick = this.onEmojiClick.bind(this)
  }

  onChange (event) {
    this.setState({search: event.target.value})
  }

  onEmojiClick (e, emoji) {
    clipboard.writeText(emoji.char)
  }

  render () {
    const emojis = Object.keys(emojilib.lib).filter((key) => {
      return key.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    }).map((s) => { return emojilib.lib[s] })

    return (
      <div>
        <Search onChange={this.onChange} />
        <div className='results'>
          <Results
            filteredContent={emojis}
            onEmojiClick={this.onEmojiClick} />
        </div>
      </div>
    )
  }
}
