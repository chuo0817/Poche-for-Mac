import React from 'react'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Player from '../player/Player.jsx'
import List from '../list/List.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMusics: [],
      playingMusic: {}
    }
  }
  componentDidMount() {
    axios
      .get('/playlists/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        const items = res.data
        this.setState({ items })
      })
  }

  render() {
    return (
      <div className="App">
        <Player music={this.state.playingMusic}></Player>
        <List onSelectedMusic={this.onPlayerMusic}></List>
      </div>
    )
  }

  renderAlbumCell(i) {
    return (
      <div className="item" style={{backgroundImage: `url(${i.cover})`}} key={i.id}>
        <Link to={{pathname: `/detail/${i.id}`}}>
          <div className="inner">
            <span className="itemText">{i.title}</span>
          </div>
        </Link>
      </div>
    )
  }

  onPlayerMusic = (music) => {
    this.setState({ playingMusic: music })
  }
}

export default App
