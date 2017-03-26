import React, {Component} from 'react'
import Search from '../components/Search'
import Results from '../components/Results'

export default class Root extends Component {
  render () {
    return (
      <div>
        <h1>Hello World</h1>
        <Search />
        <Results />
      </div>
    )
  }
}
