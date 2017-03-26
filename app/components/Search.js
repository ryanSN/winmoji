import React from 'react'

const Search = ({onChange}) => {
  return (
    <input type='text'
      placeholder='Search'
      onChange={onChange} />
  )
}

export default Search
