import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'

import './detail.css'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      playing: true,
      index: 0,
      loop: false,
      played: 0,
      volume: 0.5,
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
            url: i.url,
          }
        })
        this.setState({ items })
      })
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  pre = () => {
    this.setState({ index: --this.state.index })
  }
  next = () => {
    this.setState({ index: ++this.state.index })
    console.log(this.state.index)
  }
  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  ref = player => {
    this.player = player
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  renderLoadButton(url, label) {
    return <button onClick={() => this.load(url)}>{label}</button>
  }

  render() {
    return (
      <div className="App">
        <div className="player-wrapper" key={Object(this.state.items[this.state.index]).id}>
          <div className="actions">
            <img className="action-icon" src="images/repeat-icon.png" alt="" />
            <img className="action-icon action-icon-second" src="images/like-icon.png" alt="" />
            <img className="action-icon" src="images/list-icon.png" alt="" />
          </div>
          <div className="img-container">
            <img className="player-cover" src={Object(this.state.items[this.state.index]).cover} />
          </div>
          <ReactPlayer
            className="react-player"
            ref={this.ref}
            url={Object(this.state.items[this.state.index]).url}
            width="100%"
            height="100%"
            playing={this.state.playing}
            volume={this.state.volume}
          />
          <div className="music-detail">
            <div className="title">{Object(this.state.items[this.state.index]).title}</div>
            <div className="author">{Object(this.state.items[this.state.index]).artist}</div>
            <input className="process"
              type="range"
              min={0}
              max={1}
              step="any"
              value={this.state.played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
            <div className="playing-btn-container">
              <div className="playing-wrap" onClick={this.pre}><img src="images/former-icon.png" alt=""/> </div>
              <div className="playing-wrap playing-wrap-second" onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</div>
              <div className="playing-wrap" onClick={this.next}><img src="images/next-icon.png" alt=""/> </div>
            </div>

            {/* <input type="range" min={0} max={1} step="any" value={this.state.volume} onChange={this.setVolume} /> */}
          </div>
        </div>
      </div>
    )
  }
  Ï
}

export default Detail
