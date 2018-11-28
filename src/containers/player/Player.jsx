import React from 'react'
// import { Link } from 'react-router-dom'
import './Player.css'
import ReactPlayer from 'react-player'
const path = require('path')
const getColors = require('get-image-colors')

class Player extends React.Component {
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
      album: [],
    }
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({ index: this.props.currentIndex })
    }, 100);
  }


  render() {
    return (
      <div className="player">
        <ReactPlayer
          width="0"
          height="0"
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          ref={this.ref}
          url={Object(this.props.music).url}
          playing={this.state.playing}
          onEnded={this.onEnded}
          volume={this.state.volume}
          loop={this.state.repeat}
        />
        <div className="header">
          <div className="title">
            <span>破车推荐</span>
          </div>
        </div>

        <div className="cover" style={{ backgroundImage: `url(${Object(this.props.music).cover})` }}>
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
          <div className="title">{Object(this.props.music).title}</div>
          <div className="artist">{Object(this.props.music).artist}</div>
        </div>
      </div>
    )
  }

  onProgress = e => {
    this.setState({ activeTime: this.secondToDate(e.playedSeconds) })
  }

  onDuration = d => {
    this.setState({ totalTime: this.secondToDate(d) })
  }

  secondToDate = (result) => {
    // var h = Math.floor(result / 3600) || 00;
    if (result > 0) {

      let m = Math.floor((result / 60 % 60));
      if (m < 10) {
        m = '0' + m
      }
      let s = Math.floor((result % 60));
      if (s < 10) {
        s = '0' + s
      }
      return result = + m + ':' + s
    }
  }

  onEnded = () => {
    if (!this.state.repeat) {
      this.props.playNextMusic('repeat')
    }else {
      this.props.playNextMusic()
    }
  }

  // getColors(path.join(__dirname, Object(this.props.music[this.state.index]).cover).then(colors => {
  //   // `colors` is an array of color objects
  //   console.log(colors)
  // })

  ref = player => {
    this.player = player
  }
  playOrPauseMusic = () => {
    this.setState({ playing: !this.state.playing })
  }
  playPreviousMusic = () => {
    this.props.playPreviousMusic()
  }
  playNextMusic = () => {
    this.props.playNextMusic()
  }

}
export default Player