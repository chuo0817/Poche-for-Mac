import React from 'react'
import { Link } from 'react-router-dom'
import './List.css'
import axios from 'axios'

class List extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			albums: [],
      musics: []
		}
	}

  componentDidMount() {
    axios
      .get(`/playlists/79`, {
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
            url: i.url,
          }
        })
        console.log(items)
        this.setState({ musics: items })
      })
    axios
      .get('/playlists/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        const items = res.data
        this.setState({ albums: items })
      })


  }

	render() {
		return (
			<div className="ListContainer">
        <div className="MusicList">
          <div className="Header">
            <span>破车推荐2018年4月号</span>
          </div>
          <div className="List">
          {this.state.musics.map((music, index) => (
            <div className={`Item ${index === this.state.index ? 'active' : ''}`} key={music.id}>
              <div className="Content">
              <span className="Cover"><img src={music.cover}/></span>
              <div className="Info">
                <div className="Title">{music.title}</div>
                <div className="Artist">{music.artist}</div>
              </div>
              </div>
            </div>
          ))}
          </div>
        </div>
          <div className="AlbumList">
            <div className="List">
            {this.state.albums.map((album, index) => (
              <div className={`Item ${index === this.state.index ? 'active' : ''}`}  style={{backgroundImage: `url(${album.cover})`}} key={album.id}>
                <span className="Title">{album.title}</span>
              </div>
            ))}
            </div>
          </div>
			</div>
		)
	}
}
export default List
