import React from 'react'
import axios from 'axios'
import AudioPlayer from 'react-responsive-audio-player'


const playlist = []

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }
  // this.props.params.query
  componentDidMount() {
    console.log(this.props)
    axios
      .get(`/playlists`, {
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
        <header className="App-header">
          <h1>破车推荐detail</h1>
        </header>
        <AudioPlayer playlist={playlist} />,
      </div>
    )
  }
}

export default Detail
