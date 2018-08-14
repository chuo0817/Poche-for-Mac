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
      <div className='player-wrapper' key={Object(this.state.items[this.state.index]).id}>
        <img className="player-cover" src={Object(this.state.items[this.state.index]).cover} />
        <ReactPlayer className='react-player' url={Object(this.state.items[this.state.index]).url} width='100%' height='100%' playing={this.state.playing} />
        <button onClick={this.pre}> 上一首 </button>
        <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
        <button onClick={this.next}>
          下一首
        </button>
      </div>
      </div>
    )
  }Ï

}

export default Detail
