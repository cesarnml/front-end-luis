import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NoteList from '../containers/NoteList'
import NewNote from '../containers/NewNote'
import SideNav from './SideNav'
import NoteDetails from '../containers/NoteDetails'
import NoMatch from './NoMatch'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value })
  }

  setSearch = (search) => {
    this.setState({ search })
  }

  render() {
    return (
      <div className='App'>
        <SideNav setSearch={this.setSearch} />
        <Switch>
          <Route exact path='/' render={(props) => <NoteList {...props} search={this.state.search} handleChange={this.handleChange} setSearch={this.setSearch} />} />
          <Route path='/notes/new' component={NewNote} />
          <Route path='/notes/:id' component={NoteDetails} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default App
