import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    axios.get('/playlists/',{headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }}).then(res => {
      const items = res.data
      this.setState({items})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>破车推荐</h1>
          <ul>
            {this.state.items.map( i =>
              <li key={i.id}>{i.title}</li>
            )}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
