import React from 'react'
import './App.css'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Player from '../player/Player.jsx'
import List from '../list/List.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playingMusic: {},
      listEvent: ''
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Player music={this.state.playingMusic} onNextMusic={this.onPlayNextMusic} onPreviousMusic={this.onPlayPreviousMusic}></Player>
        <List onChangeMusic={this.onChangeMusic} execEvent={this.state.listEvent}></List>
      </div >
    )
  }

  onChangeMusic = (music) => {
    this.setState({ playingMusic: music })
  }

  onPlayerMusic = (music) => {
    this.setState({ playingMusic: music })
  }
  onPlayPreviousMusic = () => {
    this.setState({ listEvent: 'previous' })
  }
  onPlayNextMusic = (repeat) => {
    this.setState({ listEvent: 'next' })
  }
  getChildIndex = (index) => {
    this.setState({ index: index })
  }
}

export default App
