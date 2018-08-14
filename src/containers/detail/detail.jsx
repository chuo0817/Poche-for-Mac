import React from 'react'
import axios from 'axios'
import AudioPlayer from 'react-responsive-audio-player'


let playlist = []
const controls = ['playpause', 'forwardskip', 'progressdisplay']
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
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

  render() {
  console.log('asdf',playlist)

    return (
      <div className="App">
        <header className="App-header">
          <h1>detail</h1>
        </header>
        <AudioPlayer playlist={playlist} controls={controls}  autoplay={true}  />,
      </div>
    )
  }
}

export default Detail
