import React from 'react'
import './App.css'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Player from '../player/Player.jsx'
import List from '../list/List.jsx'
import { fetchMusic, fetchAlbumList } from '../../util/request'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMusicList: [],
      playingMusic: {},
      albumList: [],
      musicList: [],
      childIndex: 0,
      music: {},
      index: 0,
    }
  }

  componentDidMount() {
    fetchAlbumList(list => {
      this.setState({ albumList: list })
      const firstAlbumId = list[0].id;
      fetchMusic(firstAlbumId, music => {
        this.setState({ musicList: music })
        this.setState({ music: music[this.state.index] })
        // this.props.onSelectedMusic(musics[0])
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Player music={this.state.musicList[this.state.index]} playNextMusic={this.onPlayNextMusic} playPreviousMusic={this.onPlayPreviousMusic}></Player>
        <List albumlist={this.state.albumList} musiclist={this.state.musicList} indexfn={this.getChildIndex}></List>
      </div>
    )
  }

  onPlayerMusic = (music) => {
    this.setState({ playingMusic: music })
  }
  onPlayPreviousMusic =() => {
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
