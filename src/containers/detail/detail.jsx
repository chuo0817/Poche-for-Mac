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
      played: 0,
      volume: 0.5,
      repeat: false,
      totalTime: 0,
      activeTime: 0,
    }
  }
  // this.props.params.query
  componentDidMount() {
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
  ref = player => {
    this.player = player
  }
  playOrPauseMusic = () => {
    this.setState({ playing: !this.state.playing })
  }
  playPreviousMusic = () => {
    this.setState({ index: --this.state.index })
  }
  playNextMusic = () => {
    this.setState({ index: ++this.state.index })
  }

  secondToDate = (result)=> {
    // var h = Math.floor(result / 3600) || 00;
    var m = Math.floor((result / 60 % 60)) || '00';
    var s = Math.floor((result % 60)) || '00';
    return result = m + ":" + s;
}
  onEnded = () => {
    if (!this.state.repeat) {
      this.playNextMusic()
    }
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = e => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(e)
    }
    this.setState({ activeTime: this.secondToDate(e) })
    console.log(e,this.state.activeTime)
  }

  onDuration = d => {
    this.setState({ totalTime: this.secondToDate(d) })
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  renderLoadButton(url, label) {
    return <button onClick={() => this.load(url)}>{label}</button>
  }

  handleClickPlay(param, index) {
    this.setState({ index: param, played: 0 })
  }

  repeatSong = () => {
    this.setState({ repeat: !this.state.repeat })
  }

  render() {
    return (
      <div className="App">
        <div className="player-wrapper" key={Object(this.state.items[this.state.index]).id}>
          <div className="actions">
            <img className="action-icon" src={this.state.repeat ? 'images/repeat-icon-active.png' : 'images/repeat-icon.png'} alt="-" onClick={this.repeatSong} />
            {/* <img className="action-icon action-icon-second" src="images/like-icon.png" alt="-" /> */}
            <img className="action-icon" src="images/list-icon.png" alt="-" />
          </div>
          <div className="img-container">
            <img className="player-cover" src={Object(this.state.items[this.state.index]).cover} />
          </div>
          <ReactPlayer
            onProgress={this.onProgress}
            onDuration={this.onDuration}
            className="react-player"
            ref={this.ref}
            url={Object(this.state.items[this.state.index]).url}
            width="100%"
            height="100%"
            playing={this.state.playing}
            onEnded={this.onEnded}
            volume={this.state.volume}
            loop={this.state.repeat}
          />
          <div className="music-detail">
            <div className="title">{Object(this.state.items[this.state.index]).title}</div>
            <div className="author">{Object(this.state.items[this.state.index]).artist}</div>
            <input
              className="process"
              type="range"
              min={0}
              max={1}
              step="any"
              value={this.state.played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
            <div className="player-time">
               {this.state.activeTime}/{this.state.totalTime}
            </div>
            <div className="playing-btn-container">
              <div className="playing-wrap" onClick={this.playPreviousMusic}>
                <img src="images/former-icon.png" alt="-" />
              </div>
              <div className="playing-wrap playing-wrap-second" onClick={this.playOrPauseMusic}>
                <img src={this.state.playing ? 'images/pause-icon.png' : 'images/play-icon.png'} alt="-" />
              </div>
              <div className="playing-wrap" onClick={this.playNextMusic}>
                <img src="images/next-icon.png" alt="-" />
              </div>
            </div>

            {/* <input type="range" min={0} max={1} step="any" value={this.state.volume} onChange={this.setVolume} /> */}
          </div>
        </div>
        <div className="playlist-card">
          <div className="playlist-item">
            <span className="cover"></span>
            <span className="title title-header">Titile</span>
            <span className="artist artist-header">Artist</span>
          </div>
          {this.state.items.map((i, index) => (
            <div className={`playlist-item ${index === this.state.index ? 'active' : ''}`} key={i.id} onDoubleClick={this.handleClickPlay.bind(this, index)}>
              <span className="cover"><img className="cover-icon" src={i.cover} alt="-" /></span>
              <span className="title">{i.title}</span>
              <span className="artist">{i.artist}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  Ï
}

export default Detail
