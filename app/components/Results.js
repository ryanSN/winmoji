import React from 'react'
import emojilib from 'emojilib'

const Results = () => {
  const emojis = Object.keys(emojilib.lib).map((s) => { return emojilib.lib[s] })

  return (
    <ul>
      {
      emojis.map((emoji, idx) => {
        return (
          <li key={idx}><a href="#">{emoji.char}</a></li>
        )
      })
    }
    </ul>
  )
}

export default Results
