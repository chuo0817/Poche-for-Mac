import React from 'react'
// import { Link } from 'react-router-dom'
import './List.css'
import { fetchMusic } from '../../util/request'


class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      items: []
    }
  }

  componentWillReceiveProps() {
    this.setState({ items: this.props.musiclist })
  }

  render() {
    return (
      <div className="list-container">
        <div className="music-list">
          <div className="header">
            <span>破车推荐2018年4月号</span>
          </div>
          <div className="list">
            {this.state.items.map((music, index) => (
              <div className={`item ${index === this.state.index ? 'active' : ''}`}
              key={music.id} onDoubleClick={this.handleSelectedMusic.bind(this, music, index)}>
              <div className="content">
                <span className="cover"><img src={music.cover} alt="" /></span>
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
            {this.props.albumlist.map((album, index) => (
              <div className={`item ${index === this.state.index ? 'active' : ''}`}
                style={{ backgroundImage: `url(${album.cover})` }} key={album.id}
                onClick={this.handlePreviewAlbum.bind(this, album.id)}>
                <span className="title">{album.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  handleSelectedMusic = (music, index) => {
    this.props.indexfn(index)
  }

  handlePreviewAlbum = (id) => {
    fetchMusic(id, music => {
      this.setState({ items: music })
    })

  }
}
export default List
