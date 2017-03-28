import React from 'react'

const Search = ({onChange}) => {
  return (
    <input type='text'
      autoFocus
      placeholder='Search'
      onChange={onChange} />
  )
}

export default Search
