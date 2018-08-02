import React, { Component } from 'react'
import axios from 'axios'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }
  componentDidMount() {
    axios
      .get('/playlists/', {
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
      </div>
    )
  }
}

export default Detail
