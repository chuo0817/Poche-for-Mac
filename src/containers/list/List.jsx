import React from 'react'
import { Link } from 'react-router-dom'
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
      this.fetchMusics(firstAlbumId)
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
            <div className={`Item ${index === this.state.index ? 'active' : ''}`} 
            key={music.id} onClick={this.handleSelectedMusic.bind(this, music)}>
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
              <div className={`Item ${index === this.state.index ? 'active' : ''}`}  
              style={{backgroundImage: `url(${album.cover})`}} key={album.id}  
              onClick={this.handlePreviewAlbum.bind(this, album.id)}>
                <span className="Title">{album.title}</span>
              </div>
            ))}
            </div>
          </div>
			</div>
		)
  }

  fetchMusics(id) {
    fetchMusics(id, musics => {
      this.setState({ musics: musics })
    })
  }

  handleSelectedMusic = music => {
    this.props.onSelectedMusic(music)
  }
  
  handlePreviewAlbum = (id) => {
    this.fetchMusics(id)
  }
}
export default List
