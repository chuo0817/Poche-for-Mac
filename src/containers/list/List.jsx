import React from 'react'
// import { Link } from 'react-router-dom'
import './List.css'
import { fetchMusics, fetchMusicLists} from '../../util/request'

class List extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			albums: [],
      musics: []
		}
	}

  componentDidMount() {
    fetchMusicLists(list => {
      this.setState({ albums: list })
      const firstAlbumId = list[0].id;
      fetchMusics(firstAlbumId, musics => {
        this.setState({ musics: musics })
        this.props.onSelectedMusic(musics[0])
      })
    })
  }

	render() {
		return (
			<div className="list-container">
        <div className="music-list">
          <div className="header">
            <span>破车推荐2018年4月号</span>
          </div>
          <div className="list">
          {this.state.musics.map((music, index) => (
            <div className={`item ${index === this.state.index ? 'active' : ''}`} 
            key={music.id} onClick={this.handleSelectedMusic.bind(this, music)}>
              <div className="content">
              <span className="cover"><img src={music.cover}/></span>
              <div className="info">
                <div className="title">{music.title}</div>
                <div className="artist">{music.artist}</div>
              </div>
              </div>
            </div>
          ))}
          </div>
        </div>
          <div className="albumlist">
            <div className="list">
            {this.state.albums.map((album, index) => (
              <div className={`item ${index === this.state.index ? 'active' : ''}`}  
              style={{backgroundImage: `url(${album.cover})`}} key={album.id}  
              onClick={this.handlePreviewAlbum.bind(this, album.id)}>
                <span className="title">{album.title}</span>
              </div>
            ))}
            </div>
          </div>
			</div>
		)
  }

  fetchMusics(id) {
    
  }

  handleSelectedMusic = music => {
    this.props.onSelectedMusic(music)
  }
  
  handlePreviewAlbum = (id) => {
    fetchMusics(id, musics => {
      this.setState({ musics: musics })
    })
    
  }
}
export default List
