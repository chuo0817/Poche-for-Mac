import React from 'react'
import { Link } from 'react-router-dom'
import './Player.css'

class Player extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   items: [],
  }
 }

 render() {
  return (
   <div className="Player">
    <div className="Title">
    <span>破车推荐</span>
    </div>
    <div className="Cover">
     <div className="Control">
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
   </div>
  )
 }
}
export default Player