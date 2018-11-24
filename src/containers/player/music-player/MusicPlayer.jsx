import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'

class MusicPlayer extends React.Component {
  constructor(props) {
   super(props)
   this.state = {

   }
  }
 
  render() {
    return(
      <div>
        <ReactPlayer
            onProgress={this.onProgress}
            onDuration={this.onDuration}
            className="react-player"
            ref={this.ref}
            url={this.props.url}
            width="100%"
            height="100%"
            playing={this.state.playing}
            onEnded={this.onEnded}
            volume={this.state.volume}
            loop={this.state.repeat}
          />
      </div>
    )
  }

  onProgress = e => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(e)
    }
    this.setState({ activeTime: this.secondToDate(e.playedSeconds) })
  }

  onDuration = d => {
    this.setState({ totalTime: this.secondToDate(d) })
  }
}
export default MusicPlayer
MusicPlayer.propTypes = {
  url: PropTypes.string
}