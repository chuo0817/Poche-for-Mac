import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import detail from '../detail/detail.jsx'
import { Link } from 'react-router-dom'
import { Router, Route } from 'react-router'

class App extends React.Component {
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

  showDetail(id) {
    console.log(id)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>破车推荐</h1>
            {this.state.items.map(i => (
              this.renderAlbumCell(i)
            ))}
        </header>
      </div>
    )
  }

  renderAlbumCell(i) {
    return (
      <div className="item" style={{backgroundImage: `url(${i.cover})`}} key={i.id}>
        <Link to="/detail">
          <div className="inner">
            <span className="itemText">{i.title}</span>
          </div>
        </Link>
      </div>
    )
  }
}

export default App
