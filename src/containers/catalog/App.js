import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import { Router, Route } from 'react-router'
import { Link } from 'react-router-dom'
import detail from '../detail/detail.jsx'

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>破车推荐</h1>
          <div>
            {this.state.items.map(i => (
              <div className="item" style={{backgroundImage: `url(${i.cover})`}}
                key={i.id}>
                <Link to="/detail">
                  <div className="inner">
                    <span className="itemText">{i.title}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </header>
      </div>
    )
  }
}

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="detail" component={detail} />
    </Route>
  </Router>
), document.body)

export default App
