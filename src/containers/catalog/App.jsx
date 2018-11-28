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
      playingMusic: {}
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Player music={this.state.playingMusic} playNextMusic={this.onPlayNextMusic} playPreviousMusic={this.onPlayPreviousMusic}></Player>
        <List onChangeMusic={this.onChangeMusic}></List>
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
    this.setState({ index: --this.state.index })
  }
  onPlayNextMusic = (repeat) => {
    this.setState({ index: ++this.state.index })
  }
  getChildIndex = (index) => {
    this.setState({ index: index })
  }
}

export default App
