import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'

import './detail.css'

let playlist = []

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      playing: true
    }
  }
  // this.props.params.query
  componentDidMount() {
    console.log()
    axios
      .get(`/playlists/${this.props.location.pathname.substring(8)}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        const items = res.data.map(i => {
          return {
            id: i.id,
            cover: i.cover,
            artist: i.artist,
            title: i.name,
            url: i.url
          }
        })
        playlist = items
        console.log(playlist)
        this.setState({ items })
      })
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  renderLoadButton  (url, label) {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  render() {
    return (
      <div className="App">
      <span>detail</span>
        {playlist.map(i => (
              this.audioPlayer(i)
            ))}
      </div>
    )
  }

  audioPlayer(i) {
    return (
      <div className='player-wrapper' key={i.id}>
        <img className="player-cover" src={i.cover} />
        <ReactPlayer className='react-player' url={i.url} width='100%' height='100%' playing={this.state.playing} />
        <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
      </div>
    )
  }

}

export default Detail
