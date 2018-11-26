import React from 'react'
import { Link } from 'react-router-dom'
import './Player.css'
import ReactPlayer from 'react-player'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: {
        playing: true,
      },
      items: [],
    }
  }

  render() {
    console.log(this.props.music)
    return (
      <div className="player">
        <ReactPlayer
          width="0"
          height="0"
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          ref={this.ref}
          url={this.props.music.url}
          playing={this.state.player.playing}
          onEnded={this.onEnded}
          volume={this.state.volume}
          loop={this.state.repeat}
        />
        <div className="header">
          <div className="title">
            <span>破车推荐</span>
          </div>
        </div>

        <div className="cover" style={{backgroundImage: `url(${this.props.music.cover})`}}>
          <div className="control">
            <div className="playing-wrap" onClick={this.playPreviousMusic}>
              < img src="images/former-icon.png" alt="-" />
            </div>
            <div className="playing-wrap playing-wrap-second" onClick={this.playOrPauseMusic}>
              < img src={this.state.playing ? 'images/pause-icon.png' : 'images/play-icon.png'} alt="-" />
            </div>
            <div className="playing-wrap" onClick={this.playNextMusic}>
              < img src="images/next-icon.png" alt="-" />
            </div>
          </div>
        </div>

        <div className="player-info">
          <div className="title">{this.props.music.title}</div>
          <div className="artist">{this.props.music.artist}</div>
        </div>
      </div>
    )
  }

  onProgress = e => {
    // We only want to update time slider if we are not currently seeking
    // if (!this.state.seeking) {
    //   this.setState(e)
    // }
    // this.setState({ activeTime: this.secondToDate(e.playedSeconds) })
  }

  onDuration = d => {
    // this.setState({ totalTime: this.secondToDate(d) })
  }

  onEnd = () => {

  }
}
export default Player