import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../../app/containers/Root'

describe('app', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Root />, div)
  })
})
