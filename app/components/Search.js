import React from 'react'

const Search = ({ onChange, inputRef }) => {
  return (
    <input
      type='text'
      autoFocus
      placeholder='Search'
      onChange={onChange}
      ref={inputRef}
    />
  )
}

export default Search
